import genToken from '../utils/genToken.js';
import userModel from '../models/userModel.js';
import sendVerifyMail from '../utils/sendMail.js';

import { mailCode } from '../utils/codeGen.js';
import { isValid, isValidBody, isValidEmail } from '../utils/validations.js';

async function createProfile(req, res) {
  try {
    const { body } = req;

    const { fullName, email, password, userName } = body;

    if (!isValidBody(body)) {
      return res
        .status(400)
        .send({ status: 'Invalid', message: 'please fill the from' });
    }

    if (!isValid(fullName)) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'please! enter your name its mandatory filled',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'Email is not valid email',
      });
    }
    if (!isValid(email)) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'please! enter your email id its mandatory filled',
      });
    }

    if (!isValid(password)) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'please! enter your password its mandatory filled',
      });
    }

    if (password.length < 8 && password.length > 15) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'Password length must be 8 to 15',
      });
    }

    if (!isValid(userName)) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'please! enter your userName its mandatory filled',
      });
    }

    const user = await userModel.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (user && user.email === email.trim() && user.userVerified === false) {
      return res.send({
        status: 'Exist',
        message: 'user exist but not verified please verify your email',
      });
      //
    } else if (user && user.email === email.trim()) {
      //
      return res.send({
        status: 'Exist',
        message: 'user exist please login',
      });
      //
    } else if (user && user.userName === userName) {
      return res.send({
        status: 'Exist',
        message: 'user name already used by someOne',
      });
    }

    body['verificationCode'] = mailCode();
    await sendVerifyMail(email, body['verificationCode']);

    await userModel.create(body);
    res.status(201).send({
      status: 'user created success',
      message: 'please check your email to verify your sort Url account',
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: `something wrong from our-end ${err.message}` });
  }
}

async function logIn(req, res) {
  try {
    const { body } = req;
    const { email, password } = body;

    if (!isValidBody(body)) {
      return res
        .status(400)
        .send({ status: 'invalid', message: 'invalid data' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: 'Invalid',
        message: 'Email is not valid email',
      });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: 'Invalid!', message: 'email filled is required!.' });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: 'Invalid!', message: 'password filled is required!.' });
    }

    // find user #DB CALL
    const user = await userModel.findOne({
      $or: [
        { email: email, password: password },
        { email: email },
        { password: password },
      ],
    });

    //if not get
    if (!user) {
      // it will return
      return res.status(401).send({
        status: 'Unauthorized',
        message: 'invalid email or password', // this error
      });
    }

    if (user.password != password) {
      return res.status(401).send({
        status: 'Unauthorized',
        message: 'you enter wrong password',
      });
    } else if (user.email != email) {
      return res.status(401).send({
        status: 'Unauthorized',
        message: 'you enter wrong email',
      });
    }

    const payload = { _id: user._id, email: email, password: password };
    const token = genToken(payload);
    res.status(200).send({
      status: 'login success',
      message: `user ${user.fullName} successfully logged in`,
      token: token
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: 'something wrong from our end',
      error: error.message,
    });
  }
}

export { createProfile, logIn };
