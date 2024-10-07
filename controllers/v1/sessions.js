import sessionsModel from "../../models/sessions.js"
import schema from "../../validators/sessions.js"
import { titleSchema } from "../../validators/podcasts.js"
import podcastsModel from "../../models/podcasts.js"

export const createSession = async (req, res) => {
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


export const findSession = async (req, res) => {
    const sessions = await sessionsModel.find().populate("podcastId", "title").lean()
    res.json({ data: sessions })
}

export const findOneSession = async (req, res) => {
    const { shortName, sessionId } = req.params
    const podcast = await podcastsModel.findOne({ shortName })
    const podcastId = podcast._id.toString()
    const session = await sessionsModel.findOne({ _id: sessionId, podcastId })
    const sessions = await sessionsModel.find({ podcastId })
    res.json({
        data: {
            session, sessions
        }
    })
}

// /:id
// delete
export const remove = async (req, res) => {
    const { id } = req.params
    const session = await sessionsModel.findByIdAndDelete(id)
    if (!session) res.status(404).json({
        message: "session not found"
    })
    res.json({
        message: "session removed"
    })
}