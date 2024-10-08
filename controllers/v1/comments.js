import commentsModel from "../../models/comments.js"
import podcastsModel from "../../models/podcasts.js"
import { createCommentSchema } from "../../validators/comments.js"
// /
export const find = async (req, res) => {
    const comments = await commentsModel.find().lean()
    if (!comments.length) return res.status(404).json({ message: "comments not found" })
    res.json({ data: comments })
}
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
// /:id

export const remove = async (req, res) => {
    const { id } = req.params
    const comment = await commentsModel.findByIdAndDelete(id)
    if (!comment) return res.status(404).json({
        message: "comment not found"
    })
    res.json({
        message: "comment removed"
    })
}

// /:id/confirmed
export const confirmed = async (req, res) => {
    const { id } = req.params
    const comment = await commentsModel.findById(id, "isConfirmed")
    if (!comment) return res.status(404).json({
        message: "comment not found"
    })
    const updateComment = await commentsModel.findByIdAndUpdate(id, { isConfirmed: !comment.isConfirmed }, { new: true }).select("isConfirmed")
    res.json({
        message: `isConfirmed: ${updateComment.isConfirmed}`
    })

}