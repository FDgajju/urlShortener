import jwt from 'jsonwebtoken';

function genToken(payload) {
  return jwt.sign(payload, process.env.JWT_SEC_KEY, { expiresIn: '30d' });
}

export default genToken;
