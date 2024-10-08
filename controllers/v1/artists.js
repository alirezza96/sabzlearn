import artistsModel from "../../models/artists.js"
import schema from "../../validators/artists.js"

export const create = async (req, res) => {
    const body = req.body
    const validationResult = schema.safeParse(body)
    if (!validationResult.success) return res.status(401).json({
        message: validationResult.error.errors[0].message || "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const { title, shortName } = validationResult.data
    // is artist exists
    const artist = await artistsModel.findOne({ shortName })
    if (artist) return res.status(401).json({
        message: "artist already exists"
    })
    const newArtist = await artistsModel.create(validationResult.data)
    res.status(201).json({
        message: "artist created",
        data: newArtist
    })
}