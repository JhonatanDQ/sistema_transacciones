import Jwt  from "jsonwebtoken";
import { environment } from "../config/default.js";

export const login = async (req,res) => {
    
    const token = Jwt.sign({
        exp: Math.floor(Date.now() / 1000 ) + (60 * 60),
        data: {
            role: 'admin',
            document: '1234',
            username: 'asd1'
    }
    }, 
    environment.jwt_hash
    );

    res.status(200).json ({
        success: true,
        token: token
    })
}