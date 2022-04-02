import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import redis from 'redis';
import { promisify } from 'util';
import app from './index.js';

dotEnv.config();

const DB = process.env.DATABASE || 'mongodb://localhost:27017/urlShort';
console.log(DB);
//connect to mongoose
mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log('mongodb running and connected'))
  .catch((err) => console.log(err));

//connect to express
app.listen(process.env.PORT || 3000, function () {
  console.log('Express app running on port ' + (process.env.PORT || 3000));
});

//connect to redis
const redisClient = redis.createClient(
  15719,
  'redis-15719.c264.ap-south-1-1.ec2.cloud.redislabs.com',
  { no_ready_check: true }
);
redisClient.auth('HPfEiyE4jTNKWIrtJ7PnfAFaxjBRbqmm', function (err) {
  if (err) throw err;
});

redisClient.on('connect', async function () {
  console.log('Connected to Redis..');
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

export { SET_ASYNC, GET_ASYNC };
