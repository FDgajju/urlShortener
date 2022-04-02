import { codeGen } from '../utils/codeGen.js';
import validUrl from 'valid-url';
// const shortid = require("shortid");

import userModel from '../models/userModel.js';
import urlModel from '../models/urlModel.js';
const baseUrl = 'http://localhost:3000';

// Connect to redis

//Post Api to Create Longer to Shorten URL...
const createUrl = async function (req, res) {
  try {
    const { body, params, decode } = req;

    if (!(Object.keys(body).length > 0)) {
      // Checking Body is not Empty
      return res.status(400).send('enter your long url.');
    }

    const { userId } = params;

    if (decode._id !== userId) {
      return res.status(403).send({ status: 'unAuthorized', message: 'please logIn again!' });
    }

    const user = await userModel.findOne({ _id: userId, userVerified: true });

    if (!user) {
      return res.status(400).send({
        status: false,
        message: 'please create an account or verify your email',
      });
    }

    const longUrl = body.longUrl.trim();

    if (validUrl.isUri(longUrl)) {
      // const urlToken = shortid.generate();
      const urlToken = codeGen(5);
      let checkUrl = await urlModel.findOne({
        userId: userId,
        longUrl: longUrl,
      });

      if (checkUrl) {
        return res.send({
          message: ' You already created Short Url for this Long Url :',
          data: checkUrl,
        });
      } else {
        const shortUrl = baseUrl + '/' + urlToken;

        const storedData = {
          longUrl,
          shortUrl,
          urlCode: urlToken,
          userId: userId,
        };

        let savedData = await urlModel.create(storedData);
        return res.status(200).send({ status: true, data: savedData });
      }
    } else {
      return res.status(400).send({ status: false, message: 'Invalid Long Url' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Something wrong from our-end ', error: error.message });
  }
};

//redirect Api

export { createUrl };
