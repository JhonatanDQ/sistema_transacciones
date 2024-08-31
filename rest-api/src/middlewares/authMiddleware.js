import jwt from 'jsonwebtoken';
import { environment } from '../config/default.js';


// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
  // Obtener el token desde los headers de la solicitud
  const token = req.headers['authorization'];

  // Si no hay token, retornar un error
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado.' });
  }

  try {
    // Verificar el token utilizando la clave secreta que usaste para firmarlo
    const decoded = jwt.verify(token, environment.jwt_hash);

    // Guardar los datos decodificados en la solicitud para usarlos en otras rutas
    req.User = decoded;

    // Continuar con la siguiente función
    next();
  } catch (error) {
    // Si el token no es válido, retornar un error
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
