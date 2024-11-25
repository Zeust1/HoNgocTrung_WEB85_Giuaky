import dotenv from 'dotenv'
dotenv.config();


const env = {
    MG_DB: process.env.MG_DB,
    API: process.env.API,
    PORT: process.env.PORT,
    SALT: process.env.SALT,
    SECRET_KEY: process.env.SECRET_KEY
}

export default env