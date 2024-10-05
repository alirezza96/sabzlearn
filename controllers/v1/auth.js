import userModel from "../../models/users.js"
import { encrypt, generateToken } from "../../utils/auth.js"
import schema from "../../validators/auth.js"

export const register = async (req, res) => {
    const body = req.body
    const validationResult = schema.safeParse(body)
    if (!validationResult.success) return res.status(400).json({
        message: "validataion failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const { firstName, lastName, username, email, phone, password } = validationResult.data
    try {
        // check user not exists
        let user = await userModel.findOne({
            $or: [
                { username }, { email }, { phone }
            ]
        })
        if (user) return res.status(401).json({ message: "user already existes" })
        // hashed password
        const encryptedPassword = await encrypt(password)
        // role
        const isAdmin = await userModel.find({}).lean().limit(1)
        user = await userModel.create({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            phone,
            password: encryptedPassword,
            role: !isAdmin.length ? "admin" : "user"
        })
        // accessToken
        const { _id: id, role, is_ban: isBan } = user
        const userObj = user.toObject()
        Reflect.deleteProperty(userObj, "password")
        const token = generateToken({ id, role, isBan })
        res.json({ message: "user registered", data: userObj, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const login = async (req, res) => {
    res.json("welcome to register page")
}
export const getMe = async (req, res) => {
    res.json("welcome to register page")
}
