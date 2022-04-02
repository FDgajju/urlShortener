import userModel from '../models/userModel.js';
import { isValid } from '../utils/validations.js';

// localhost:3000/verify/:userId
async function verifyUser(req, res) {
  try {
    const { body, params } = req;
    const { code } = body;
    const { userId } = params;

    const user = await userModel.findOne({ _id: userId,  userVerified: false});

    if(!user){
      return res.status(404).send({status: false, message: "user Dose not exist"})
    }

    if (!isValid(code)) {
      return res
        .status(400)
        .send({ status: false, message: 'inter verification code' });
    }

    if (code == user.verificationCode) {
      const check  = await userModel.findOneAndUpdate(
        { _id: userId },
        { $set: { userVerified: true }, $unset: {verificationCode: ""}},
        { new: true }
      );
      console.log(check)
      res.status(200).send({status: true, message: "user verified"})
    }else {
      res.status(400).send({status: false, message: "please inter valid verification code"})
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: `something wrong from our end`,
      error: err.message,
    });
  }
}

export default verifyUser
