import podcastsModel from "../../models/podcasts.js"
import schema from "../../validators/podcasts.js"

export const create = async (req, res) => {
    const body = req.body
    const validationResult = schema.safeParse(body)
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const { filename } = req.file
    // podcast exists
    const podcast = await podcastsModel.findOne({ shortName: validationResult.data.shortName })
    if (podcast) return res.status(401).json({ message: "podcast already exists" })
    // create
    const newPodcast = await podcastsModel.create({ ...validationResult.data, cover: filename })
    res.status(201).json({ message: "podcast created", data: newPodcast })
}