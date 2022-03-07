const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const app = require("./index")

dotEnv.config({ path: `${__dirname}/../config.env`});

const DB = process.env.DATABASE || "mongodb://localhost:27017/urlShort";

mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => console.log("mongodb running and connected"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});