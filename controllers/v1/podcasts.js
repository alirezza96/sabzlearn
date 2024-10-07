import schema from "../../validators/podcasts.js"

export const create = async (req, res) => {
    const body = req.body
    const validationResult = schema.safeParse(body)
    if(!validationResult.success) return res.status(401).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    console.log("req body =>", validationResult)
    res.json({ message: "hello world" })
}