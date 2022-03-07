const shortid = require("shortid");
const redis = require("redis");
const { promisify } = require("util");
const validUrl = require("valid-url");

const urlModel = require("../models/urlModel");
const baseUrl = "http://localhost:3000";

// Connect to redis
const redisClient = redis.createClient(
    15719,
    "redis-15719.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("HPfEiyE4jTNKWIrtJ7PnfAFaxjBRbqmm", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

//Post Api to Create Longer to Shorten URL...
const createUrl = async function (req, res) {
    try {
        if (!(Object.keys(req.body).length > 0)) {
            // Checking Body is not Empty
            console.log(1);
            res.status(400).send("No Url Found...!!");
        }

        const longUrl = req.body.longUrl.trim();
        console.log(longUrl);

        //url Validation
        if (
            !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
                longUrl
            )
        ) {
            return res
                .status(400)
                .send({ status: false, message: `This is not a valid Url` });
        }

        if (
            (longUrl.includes("https://") &&
                longUrl.match(/https:\/\//g).length !== 1) ||
            (longUrl.includes("http://") &&
                longUrl.match(/http:\/\//g).length !== 1) ||
            (longUrl.includes("ftp://") &&
                longUrl.match(/ftp:\/\//g).length !== 1)
        ) {
            return res
                .status(400)
                .send({ status: false, msg: "Url is not valid" });
        }

        if (!/(.com|.org|.co.in|.in|.co|.us)/.test(longUrl)) {
            return res.status(400).send({ status: false, msg: "Invalid url" });
        }

        if (
            longUrl.includes("w") &&
            (longUrl.indexOf("w") === 6 ||
                longUrl.indexOf("w") === 7 ||
                longUrl.indexOf("w") === 8)
        ) {
            let arr = [];
            let i = longUrl.indexOf("w");
            while (longUrl[i] == "w") {
                if (longUrl[i] === "w") {
                    arr.push(longUrl[i]);
                }
                i++;
            }

            if (!(arr.length === 3)) {
                return res
                    .status(400)
                    .send({ status: false, msg: "Url is not valid" });
            }
        } // url validation

        if (validUrl.isUri(longUrl)) {
            const urlToken = shortid.generate();
            let checkUrl = await urlModel.findOne({ longUrl: longUrl });
            if (checkUrl) {
                return res.send({
                    message:
                        " You already created Short Url for this Long Url :",
                    data: checkUrl,
                });
            } else {
                const shortUrl = baseUrl + "/" + urlToken;
                const storedData = { longUrl, shortUrl, urlCode: urlToken };
                let savedData = await urlModel.create(storedData);
                res.status(200).send({ status: true, data: savedData });
            }
        } else {
            return res
                .status(400)
                .send({ status: false, message: "Invalid Long Url" });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

//This is my Second Get API to redirect from short url to Corresponding Long url
const getUrl = async function (req, res) {
    try {
        let { urlCode } = req.params;
        // console.log(urlCode1)

        const getAsync = await GET_ASYNC(`${urlCode}`);
        if (getAsync) {
            const parseData = JSON.parse(getAsync);
            console.log("Data Fetch");
            //console.log(typeof urlCode)
            return res.redirect(parseData.longUrl);
        } else if (urlCode) {
            // console.log(url)
            const urlFind = await urlModel.findOne({ urlCode: urlCode });
            //console.log(urlFind)
            if (urlFind) {
                const storeCacheData = await SET_ASYNC(
                    `${urlCode}`,
                    JSON.stringify(urlFind),
                    "EX",
                    20
                );
                console.log("Data Got Stored", storeCacheData);
                return res.status(302).redirect(urlFind.longUrl);
            } else {
                res.status(400).send({
                    status: false,
                    message: "There is No Short Url Found",
                });
            }
        } else {
            return res
                .status(404)
                .send({ status: false, message: "No Url Code Params Found" });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = { createUrl, getUrl };
