import newsletterModel from "../../models/newsletter.js"
import schema from "../../validators/newsletter.js"
export const create = async (req, res) => {
    const { email } = req.body
    const validationResult = schema.safeParse({ email })
    if (!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const newsletter = await newsletterModel.findOne({ email })
    if (newsletter) return res.status(400).json({
        message: "already joined newsletter"
    })
    const createNewsletter = await newsletterModel.create({ email })
    res.status(201).json({
        message: "joined newsletter"
    })
}