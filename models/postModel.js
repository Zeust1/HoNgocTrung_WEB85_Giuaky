import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: String,
    content: String,
    createdAt: Date,
    updatedAt: Date
})

const postModel = mongoose.model('post',postSchema)

export default postModel