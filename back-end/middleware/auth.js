import jwt from 'jsonwebtoken';

async function auth(req, res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(403);
        throw new Error('Not authorized, token failed');
      }
      const decode = jwt.verify(token, process.env.JWT_SEC_KEY);
      req.decode = decode;
      next();
    }
    if (!token) {
      return res
        .status(403)
        .send({ status: 'not authorized', message: 'invalid token please login!' });
    }
  } catch (error) {
    console.log(error, 1);
    res.status(500).send({
      status: false,
      // massage: 'something wrong from our end',
      massage: error.massage,
    });
  }
}

export default auth;
