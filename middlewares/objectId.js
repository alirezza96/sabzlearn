import { isValidObjectId } from "mongoose"

export default function objectId(req, res, next) {
    try {
        const { id } = req.params
        if (!isValidObjectId(id)) return res.status(400).json("objectId not valid")
        next()
    } catch (error) {
        console.log("error middlewares/objectId")
        res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}