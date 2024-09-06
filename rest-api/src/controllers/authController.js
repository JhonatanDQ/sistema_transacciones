import Jwt from "jsonwebtoken";
import { environment } from "../config/default.js";
import  User  from "../models/User.js";
import crypto from 'crypto';

// Utilidad para validar campos
const isEmpty = (value) => !value || value.trim().length === 0;

export const Register = async (req, res) => {
  const { usuario, contrasena, documento } = req.body;

  // Validaciones
  if (isEmpty(usuario) || isEmpty(contrasena) || isEmpty(documento)) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  if (contrasena.length < 8) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }

  if (!/^\d+$/.test(documento)) {
    return res.status(400).json({ message: "El documento debe contener solo números" });
  }
  if (!documento.length > 10){
    return res.status(400).json({ message: "El documento debe tener 10 dígitos" });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { usuario } });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // Verificar si el documento ya está registrado
    const existingDocument = await User.findOne({ where: { documento } });
    if (existingDocument) {
      return res.status(409).json({ message: "El documento ya está registrado" });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = crypto.createHash('sha256').update(contrasena).digest('hex');

    // Crear el usuario en la base de datos
    const user = await User.create({ usuario, contrasena: hashedPassword, documento });

    res.status(200).json({
      success: true,
      message: 'Usuario registrado exitosamente',
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login Controller
export const Login = async (req, res) => {
  const { documento, contrasena } = req.body;

  try {
    const user = await User.findOne({ where: { documento } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Encriptar la contraseña ingresada con SHA256
    const hashContrasena = crypto.createHash('sha256').update(contrasena).digest('hex');

    // Comparar el hash de la contraseña ingresada con el hash almacenado
    if (user.contrasena !== hashContrasena) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si las contraseñas coinciden, genera el token JWT
    const token = Jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expira en 1 hora
        data: {
          documento: user.documento,
          usuario: user.usuario,
        },
      },
      environment.jwt_hash
    );

    // Envía el token en una cookie
    // res.cookie('token', token, {
    //   httpOnly: true, // Solo accesible a través de HTTP(S), no JavaScript
    //   secure: false, // Solo se enviará a través de HTTPS en producción
    //   maxAge: 3600000, // 1 hora en milisegundos
    // });

    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const logout = (req, res) => {
  res.clearCookie('authtToken');
  res.status(200).json({ message: "Logout exitoso" });
};


export default {
  Login,
  Register,
  logout,
};
