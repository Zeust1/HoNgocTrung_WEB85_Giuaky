import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import userAuth from "../middleware/userAuth.js";

const userRoutes = Router()

userRoutes.route('/users/register').post(userControllers.register)
userRoutes.route('/users/login').post(userAuth.authentication, userControllers.login)


export default userRoutes