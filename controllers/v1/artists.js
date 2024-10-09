import artistsModel from "../../models/artists.js"

export const create = async (req, res) => {
    const { title, shortName } = req.body
    // is artist exists
    const artist = await artistsModel.findOne({ shortName })
    if (artist) return res.status(401).json({
        message: "artist already exists"
    })
    const newArtist = await artistsModel.create({title, shortName})
    res.status(201).json({
        message: "artist created",
        data: newArtist
    })
}