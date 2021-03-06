import jwt from 'jsonwebtoken';

require('dotenv').config();

const key = process.env.JWT_SECRET;

class AuthMiddleware {
  static authorizeUser(req, res, next) {
    const { authorization } = req.headers;
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const token = authorization.split(' ')[1];
      return jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return res.status(401).json({ success: false, message: 'Your Token is invalid' });
        }
        req.user = decoded.id;
        req.role = decoded.role;
        return next();
      });
    }
    return res.status(401).json({ success: false, message: 'Please Login or Signup to gain access' });
  }
}

export default AuthMiddleware;
