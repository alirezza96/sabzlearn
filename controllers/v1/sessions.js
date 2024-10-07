import sessionsModel from "../../models/sessions.js"
import schema from "../../validators/sessions.js"

export const create = async (req, res) => {
    const body = req.body
    const validationResult = schema.safeParse(body)
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const file = req.file?.filename
    // is session exists 
    const { title, podcastId, isFree } = validationResult.data
    const session = await sessionsModel.findOne({
        $and: [
            { title }, { podcastId }
        ]
    })
    if (session) return res.status(401).json({
        message: "session already exists"
    })
    //create
    const newSession = await sessionsModel.create({ title, podcastId, isFree, file })
    res.status(201).json({
        message: "session created",
        data: newSession
    })
}