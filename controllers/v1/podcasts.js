import commentsModel from "../../models/comments.js"
import podcastsModel from "../../models/podcasts.js"
import salesModel from "../../models/sales.js"
import sessionsModel from "../../models/sessions.js"
import { decodeToken } from "../../utils/auth.js"
import { podcastsSchema } from "../../validators/podcasts.js"
import categoriesModel from "../../models/categories.js"
export const create = async (req, res) => {
    const body = req.body
    const validationResult = podcastsSchema.safeParse(body)
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const filename = req.file?.filename
    if (!filename) return res.status(401).json({
        message: "cover required"
    })
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

export const findOne = async (req, res) => {
    const { shortName } = req.params
    const podcast = await podcastsModel
        .findOne({ shortName })
        .populate("categoryId", "title shortName")
        .populate("artistId", "title")
    const podcastId = podcast._id
    const sessions = await sessionsModel.find({ podcastId }).lean()
    const comments = await commentsModel.find({ podcastId, isConfirmed: true }).lean()
    const soldCount = await salesModel.find({ podcastId }).countDocuments().lean()
    const token = req.header("Authorization")?.split(" ")[1]
    const payload = decodeToken(token)
    const userId = payload?.id
    const isUserBought = !!(await salesModel.findOne({ userId, podcastId }))
    res.json({
        data: {
            podcast, sessions, comments, soldCount, isUserBought
        }
    })
}

export const findRelatedPodcasts = async (req, res) => {
    const { shortName } = req.params
    const podcast = await podcastsModel.findOne({ shortName })
    const categoryId = podcast.categoryId.toString()
    const relatedPodcasts = await podcastsModel.find({
        categoryId, _id: {$ne: podcast._id}
    })
    if (!relatedPodcasts.length) return res.status(404).json({ message: "related podcasts not found" })
    res.json({ data: relatedPodcasts })
}