import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import env from "../configs/enviroment.js"

const postAuth = {
    authentication: async (req, res, next) => {
        const { apiKey } = req.query
            try {
                if(!apiKey) throw new Error('user is invalid')
                const token = apiKey.split("$")[4]
                jwt.verify(token, env.SECRET_KEY, async (err, decoded) => {
                    if(err){
                        res.status(403).send({
                            message: err.message
                        })
                    }else{
                        const user = await userModel.findOne({email: decoded.email})
                        if(!user) throw new Error('user is invalid')
                        req.headers.userId = user._id
                        next()
                    }
                })
            } catch (error) {
                res.status(403).send({
                    message: error.message
                })
            }
    }
}

export default postAuth