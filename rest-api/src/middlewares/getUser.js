import User from '../models/User.js'; 

// Middleware para obtener el usuario basado en el documento
const getUser = async (req, res, next) => {
  const { senderDocument } = req.body;

  try {
    // Buscar el usuario remitente en la base de datos
    const user = await User.findOne({ where: { documento: senderDocument } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario remitente no encontrado' });
    }

    // Asignar el usuario al objeto req
    req.User = user;

    // Continuar al siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

export default getUser;
