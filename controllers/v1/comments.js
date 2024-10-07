import commentsModel from "../../models/comments.js"
import podcastsModel from "../../models/podcasts.js"
import { createCommentSchema } from "../../validators/comments.js"

export const createComment = async (req, res) => {
    const { shortName } = req.params
    const { body,
        isConfirmed,
        score,
        isReply,
        mainCommentId, } = req.body
    const podcast = await podcastsModel.findOne({ shortName }).lean()
    const podcastId = podcast._id
    const userId = req.user.id
    // validation 

    const validationResult = createCommentSchema.safeParse({
        body,
        isConfirmed,
        score,
        isReply,
        mainCommentId: mainCommentId?.toString(),
        podcastId: podcastId.toString(),
        userId: userId.toString()
    })
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const comment = await commentsModel.create(validationResult.data)
    res.status(201).json({
        message: "comment created"
    })

}