import { Router } from "express";
import postControllers from "../controllers/postControllers.js";
import postAuth from "../middleware/postAuth.js";


const postRoutes = Router()

postRoutes.route('/posts/:id').put(postAuth.authentication, postControllers.updatePost)
postRoutes.route('/posts').post(postAuth.authentication, postControllers.createPost)



export default postRoutes