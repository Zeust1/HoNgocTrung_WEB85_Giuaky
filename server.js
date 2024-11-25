import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js';
import env from './configs/enviroment.js'
import postRoutes from './routes/postRoutes.js';


mongoose.connect(env.MG_DB)

const app = express()
app.use(express.json())

app.use(env.API, userRoutes)
app.use(env.API, postRoutes)

app.listen(env.PORT, () => console.log(`server is running on port ${env.PORT}`))