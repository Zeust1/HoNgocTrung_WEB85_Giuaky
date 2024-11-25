import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from "../configs/enviroment.js";

const userControllers = {
    register: async (req, res) => {
        const { userName, email, password } = req.body
        try {
            if(!userName || !email || !password) throw new Error('thieu thong tin dang ky')
            const uniqueEmail = await userModel.findOne({email})
            if(uniqueEmail) throw new Error('Email da ton tai')
            const newUser = await userModel.create({
                userName,
                email,
                salt: env.SALT,
                hash: bcrypt.hashSync(password, env.SALT)
            })
            res.status(201).send({
                message: 'da tao tai khoan thanh cong',
                data: newUser
            })
        } catch (error) {
            res.status(201).send({
                message: error.message
            })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const user = await userModel.findOne({email})
        const data = {
            email: email
        }
        const token = jwt.sign(data,env.SECRET_KEY, {expiresIn: '3m'})
        const apiKey = `mern-$${user._id}$-&${email}$-$${token}$`
        req.headers.authorization = apiKey
        res.status(200).send({
            apiKey: apiKey
        })
    }
}

export default userControllers