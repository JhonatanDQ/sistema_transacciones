// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'clavexd'; // Reemplaza con tu clave secreta

export const verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { documento: decoded.documento }; // Guardar el documento del usuario en el request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
