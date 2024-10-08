import podcastsModel from "../../models/podcasts.js"
import { podcastsSchema } from "../../validators/podcasts.js"

export const create = async (req, res) => {
    const body = req.body
    const validationResult = podcastsSchema.safeParse(body)
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

export const find = async (req, res) => {
    const podcasts = await podcastsModel.find().lean()
    if (!podcasts.length) return res.status(404).json({
        message: "podcast not found"
    })
    res.json({
        data: podcasts
    })
}