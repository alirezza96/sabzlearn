import sessionsModel from "../../models/sessions.js"
import schema from "../../validators/sessions.js"
import { titleSchema } from "../../validators/podcasts.js"
import podcastsModel from "../../models/podcasts.js"

export const create = async (req, res) => {
    const { id: podcastTitle } = req.params

    // 
    const podcastValidationResult = titleSchema.safeParse({ title: podcastTitle })
    if (!podcastValidationResult.success) return res.status(401).json({
        message: "podcast not valid",
        errors: podcastValidationResult.error.flatten().fieldErrors
    })
    const podcast = await podcastsModel.findOne({ title: podcastTitle })
    console.log("podcast =>", podcast)
    if (!podcast) return res.status(404).json({ message: "podcast not found" })

    const validationResult = schema.safeParse({ ...req.body, podcastId: podcast._id.toString() })
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const file = req.file?.filename
    const { title, podcastId } = validationResult.data
    // is session exists 
    const session = await sessionsModel.findOne({
        $and: [
            { title }, { podcastId }
        ]
    })
    if (session) return res.status(401).json({
        message: "session already exists"
    })
    //create
    const newSession = await sessionsModel.create({ ...validationResult.data, file })
    res.status(201).json({
        message: "session created",
        data: newSession
    })
}