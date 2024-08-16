import { User } from '../models/User.js'

export const getUser = (req, res) => {
    res.send('getting users')
}

export const createUser = (req, res) => {
    const {nombre,usuario,contraseña,documento} = req.body
    res.send('creating users')
}

