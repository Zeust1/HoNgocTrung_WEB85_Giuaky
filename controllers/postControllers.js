import postModel from "../models/postModel.js";


const postControllers = {
   createPost: async (req, res) => {
        try {
            const { content } = req.body
            if(!content) throw new Error('Content is required')
            const userId = req.headers.userId
            const now = new Date()
            const newPost = await postModel.create({
                userId: userId,
                content,
                createdAt: now,
                updatedAt: now
            })
            res.status(200).send({
                message: 'Post is created',
                data: newPost
            })
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            })
        }
   },
   updatePost: async (req, res) => {
    const { content } = req.body
    const { id } = req.params
    const userId = req.headers.userId
    try {
        if(!id) throw new Error('post is not found')
        const findPost = await postModel.findOne({_id: id})
        if(findPost.userId !== userId.toString()) throw new Error('post is not found')
        const updatedPost = await postModel.findByIdAndUpdate({_id: id},{
            content: content,
            updatedAt: new Date()
        })
        res.status(200).send({
            message: 'Post is updated',
            data: updatedPost
        })
    } catch (error) {
        res.status(404).send({
            message: error.message
        })
    }
    
   }
}

export default postControllers