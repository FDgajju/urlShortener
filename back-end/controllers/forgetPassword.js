import userModel from '../models/userModel.js';
import sendVerifyMail from '../utils/sendMail.js';
import { mailCode } from '../utils/codeGen.js';
import { isValid, isValidBody } from '../utils/validations.js';

async function forgetPass(req, res) {
	try {
		const { email } = req.body;

    console.log(email)
		if (!isValid(email)) {
			return res.status(400).send({ status: false, message: 'enter your email id' });
		}

		const user = await userModel.findOne({ email: email });

		if (!user) {
			return res.status(404).send({ status: false, message: 'no user found with this email' });
		}

		const code = mailCode();
		await sendVerifyMail(email, code);
		await userModel.findOneAndUpdate({ email: email }, { $set: { verificationCode: code } });

		res.status(200).send({ status: false, message: 'code send successfully check your mail!' });
	} catch (err) {
		res.status(500).send({ status: false, message: 'something wrong from our end' });
		throw new Error(error.message);
	}
}

async function resetPass(req, res) {
	try {
		const { code, password } = req.body;

		if (!isValidBody(req.body)) {
			return res.status(400).send({ status: false, message: 'invalid filled' });
		}

		if (!isValid(code)) {
			return res.status(400).send({ status: false, message: 'enter the code' });
		}

		if (!isValid(password)) {
			return res.status(400).send({ status: false, message: 'enter new password' });
		}

		const user = await userModel.findOneAndUpdate(
			{ verificationCode: code },
			{ $set: { password: password }, $unset: { verificationCode: '' } }
		);

		if (!user) {
			return res.status(400).send({ status: false, message: 'invalid code' });
		}

		res.status(200).send({ status: false, message: 'password successfully updated' });
	} catch (error) {
		res.status(500).send({ status: false, message: 'something wrong from our end' });
		throw new Error(error.message);
	}
}

export { forgetPass, resetPass };
