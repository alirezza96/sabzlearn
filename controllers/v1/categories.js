import categoriesModel from "../../models/categories.js"
import podcastsModel from "../../models/podcasts.js"
import schema from "../../validators/categories.js"

// /:title
export const findByTitle = async (req, res) => {
    const { id: shortName } = req.params
    const validationResult = schema.pick({ shortName: true }).safeParse({ shortName })
    if (!validationResult.success) return res.status(401).json({
        message: "category not found 1"
    })
    const category = await categoriesModel.findOne({ shortName })
    if (!category) return res.status(404).json({
        message: "category not found"
    })
    const podcasts = await podcastsModel.find({ categoryId: category._id })
    res.json({
        data: {
            category, podcasts
        }
    })
}

export const update = async (req, res) => {
    const { id } = req.params
    const body = req.body
    const validationResult = schema.safeParse(body)
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const category = await categoriesModel.findByIdAndUpdate(id, body)
    if (!category) return res.status(404).json({ message: "category not found" })
    res.json({ message: "category updated" })

}

export const remove = async (req, res) => {
    const category = await categoriesModel.findByIdAndDelete(req.params.id)
    if (!category) return res.status(404).json({ message: "category not found" })
    res.json({ message: "categorey deleted" })
}

// /
export const create = async (req, res) => {
    const body = req.body
    const validationResult = schema.safeParse(body)
    if (!validationResult.success) return res.status(400).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const category = categoriesModel.create(body)
    res.status(301).json({
        message: "category created"
    })
}

export const find = async (req, res) => {
    const categoires = await categoriesModel.find().lean()
    res.json({ data: categoires })
}