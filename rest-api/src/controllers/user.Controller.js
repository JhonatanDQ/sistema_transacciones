import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const { usuario, contrasena, documento } = req.body;

    const newUser = await User.create({
      usuario,
      contrasena,
      documento,
    });
    
    return res.send(true)
  } catch (error) {
    
    return res.send(false)
  }

};

export default {
  getUsers,
  createUser,
}
