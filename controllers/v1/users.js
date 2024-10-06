import userModel from "../../models/users.js";
import { encrypt } from "../../utils/auth.js";
import { registerSchema } from '../../validators/auth.js'

// /ban/:id
export const banUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findOneAndUpdate({ _id: id, isBan: false }, { isBan: true })
        if (!user) return res.status(404).json({ message: "user not found" })
        res.status(301).json({ message: "user banned" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
// /
export const find = async (req, res) => {
    const users = await userModel.find({}, "-password").lean()
    res.json({ data: users })
}

export const update = async (req, res) => {
    const body = req.body
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) return res.status(422).json({
        message: "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const hashedPassword = await encrypt(body.password)
    const user = await userModel.findByIdAndUpdate(req.user.id, { ...req.body, password: hashedPassword })
    res.json({ message: "user updated" })
}


// /:id
export const remove = async (req, res) => {
    const { id } = req.params
    const user = await userModel.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ message: "user not found" })
    res.json({ message: "user removed" })
}

// /:id/role
export const role = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id, "role")
        if (!user) return res.status(404).json({ message: "user not found" })
        const role = user.role === "user" ? "admin" : "user"
        const updatedUser = await userModel.findByIdAndUpdate(id, { role })
        res.json({ message: "user updated" })
    } catch (error) {
        console.log("error controllers/role")
        res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}