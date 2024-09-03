import Jwt from 'jsonwebtoken';
import { environment } from '../config/default.js';
import User from '../models/User.js';
import cookieParser from 'cookie-parser';

export const verifyToken = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization').replace('Bearer ', '');
  const authHeader = req.header('Authorization');
  // const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  try {
    const decoded = Jwt.verify(token, environment.jwt_hash);

    // Find the user based on the decoded document
    const user = await User.findOne({ where: { documento: decoded.data.documento } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Add the user object to the request
    req.User = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
