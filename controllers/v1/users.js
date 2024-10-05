import userModel from "../../models/users.js";
import { isValidObjectId } from "mongoose"
export const banUser = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(422).json({ message: "object id not valid" })
    try {
        const user = await userModel.findOneAndUpdate({ _id: id, is_ban: false }, { is_ban: true })
        if (!user) return res.status(404).json({ message: "user not found" })
        res.status(301).json({ message: "user banned" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}