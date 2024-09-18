import Jwt from 'jsonwebtoken';
import { environment } from '../config/default.js';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const authHeader = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  try {
    const decoded = Jwt.verify(token, environment.jwt_hash);

    const user = await User.findOne({ where: { documento: decoded.data.documento } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    req.User = user;
    req.userDocument = decoded.document;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
