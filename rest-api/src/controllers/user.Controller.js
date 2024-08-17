import { User } from '../models/User.js';


export const getUsers = (req, res) => {
    // try {
    //     const users = awaitUser.findAll(); // Encuentra todos los usuarios en la base de datos
    //     res.json(users); // Enviar los usuarios como JSON en la respuesta
    //   } catch (error) {
    //     res.status(500).json({ error: 'Error al obtener los usuarios' }); // Manejo de errores
    //   }
res.send('Getting Users')
}

export const createUser = (req, res) => {
    
res.send('Creating User')
}