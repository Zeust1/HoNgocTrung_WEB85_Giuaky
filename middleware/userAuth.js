import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import  env  from "../configs/enviroment.js"

const userAuth = {
    authentication: async ( req, res, next) => {
        const { email, password } = req.body

        try {
            if(!email || !password) throw new Error('tai khoan hoac mat khau khong dung')
            const checkEmail = await userModel.findOne({email})
            if(!checkEmail) throw new Error('tai khoan hoac mat khau khong dung')
            const hash = bcrypt.hashSync(password, env.SALT)
            if(checkEmail.hash !== hash) throw new Error('tai khoan hoac mat khau khong dung')
            next()
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    }
}

export default userAuth