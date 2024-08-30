import dotenv from "dotenv"
dotenv.config()

export const environment = {
    port : process.env.PORT,
    jwt_hash : process.env.JWT_HASH,
    db_url : process.env.DB_URL
}


