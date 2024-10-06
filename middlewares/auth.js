import userModel from "../models/users.js"
import { decodeToken } from "../utils/auth.js"

export default async function auth(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) return res.status(409).json({ message: "token not valid" })
    const payload = decodeToken(token)
    if (!payload) return res.status(409).json({ message: "token not valid" })
    const { id } = payload
    try {
        const user = await userModel.findById(id, "role isBan username")
        if (!user) return res.status(409).json({ message: "access denied; user not found" })
        const { username, role, isBan: isBan } = user
        if (isBan) return res.status(401).json({ message: `access denied; "${username}" banned` })
        req.user = { id, role }
        next()

    } catch (err) {
        console.log("error middlewares/auth")
        res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}