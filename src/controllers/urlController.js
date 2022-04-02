import { codeGen } from '../utils/codeGen.js';
import validUrl from 'valid-url';
import { isValidId, isValid } from '../utils/validations.js';
// import shortid from "shortid";

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

		const { longUrl, title } = req.body;

		if (!isValid(title)) {
			return res.status(400).send({ status: false, message: 'enter title for url !' });
		}

		if (!isValid(longUrl)) {
			return res.status(400).send({ status: false, message: 'enter your long url !' });
		}

		if (validUrl.isUri(longUrl)) {
			// const urlToken = shortid.generate();
			const urlToken = codeGen(5);
			let checkUrl = await urlModel
				.findOne({
					userId: userId,
					longUrl: longUrl,
				})
				.select({ title: 1, shortUrl: 1, _id: 0 });

			if (checkUrl) {
				return res.send({
					message: ' You already created Short Url for this Long Url :',
					data: checkUrl,
				});
			} else {
				const shortUrl = baseUrl + '/' + urlToken;

				const storedData = {
					title,
					longUrl,
					shortUrl,
					urlCode: urlToken,
					userId: userId,
				};

				let savedData = await urlModel.create(storedData);
				const returnData = {
					userName: user.userName,
					title: savedData.title,
					shortUrl: savedData.shortUrl,
				};
				return res.status(200).send({ status: true, data: returnData });
			}
		} else {
			return res.status(400).send({ status: false, message: 'Invalid Long Url' });
		}
	} catch (error) {
		return res.status(500).send({ message: 'Something wrong from our-end ', error: error.message });
	}
};

async function getAllShortUrls(req, res) {
	try {
		const { params, decode } = req;

		if (isValidId(params.userId)) {
			return res.status(400).send({ status: 'invalid', message: 'invalid userID!' });
		}

		console.log(params.userId);
		const user = await userModel
			.findOne({ _id: params.userId })
			.select({ _id: 0, password: 0, __v: 0, userVerified: 0 });

		// console.log(user)

		if (!user) {
			return res.status(400).send({ status: false, message: 'user dose not exist' });
		}

		if (user.userVerified === false) {
			return res.status(400).send({ status: false, message: 'user not verified' });
		}

		if (decode._id !== params.userId) {
			return res.status(403).send({ status: 'unauthorized', message: 'please login again!' });
		}

		const urls = await urlModel
			.find({ userId: params.userId })
			.select({ title: 1, shortUrl: 1, _id: 0 });

		let userData = JSON.parse(JSON.stringify(user));
		userData['urls'] = urls.length === 0 ? 'you not generated any short url ' : urls;

		res.status(200).send({ status: 'fetched', data: userData });
	} catch (error) {
		res.status(500).send({ status: false, message: 'something wrong from our end!' });
		throw new Error(error.message);
	}
}

export { createUrl, getAllShortUrls };
