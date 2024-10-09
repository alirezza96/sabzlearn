import z from "zod"
import podcastsModel from "../../models/podcasts.js"
export const find = async (req, res) => {
    const { q } = req.query
    const validationResult = z.object({ q: z.string().trim().min(1) }).safeParse({ q })
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const podcasts = await podcastsModel.find({
        $or: [
            { title: { $regex: ".*" + q + ".*" } },
            { shortName: { $regex: ".*" + q + ".*" } },
        ]
    }, "title shortName").lean()
    if (!podcasts.length) return res.status(404).json({ message: "not found" })
    res.json({ data: podcasts })
}