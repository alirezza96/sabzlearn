import userModel from "../../models/users.js"
import { decrypt, encrypt, generateToken, decodeToken } from "../../utils/auth.js"
import { registerSchema, loginSchema } from "../../validators/auth.js"

export const register = async (req, res) => {
    try {
        const body = req.body
        const validationResult = registerSchema.safeParse(body)
        if (!validationResult.success) return res.status(400).json({
            message: "validataion failed",
            errors: validationResult.error.flatten().fieldErrors
        })
        const { firstName, lastName, username, email, phone, password } = validationResult.data
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
        const token = generateToken({ id, role, isBan })
        res.json({ message: "user registered", data: { firstName, lastName }, token })
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" })

    }
}
export const login = async (req, res) => {
    try {
        const body = req.body
        const validationResult = loginSchema.safeParse(body)
        if (!validationResult.success) return res.status(422).json({
            message: "validation failed",
            errors: validationResult.error.flatten().fieldErrors
        })
        const { username, password } = validationResult.data
        const user = await userModel.findOne({ username })
        const { is_ban: isBan,
            password: hashedPassword,
            _id: id,
            role,
            first_name: firstName,
            last_name: lastName } = user
        // user not found
        if (!user) return res.status(409).json({ message: "username or password incorrect" })
        // compare password
        const comparePasswordResult = await decrypt(password,
            hashedPassword)
        if (!comparePasswordResult) res.status(409).json({ message: "username or password incorrect" })
        // user not ban
        if (isBan) res.status(422).json({ message: "user banned" })
        // generate token 
        const token = generateToken({ id, role, isBan })
        res.json({ message: "logged in", data: { firstName, lastName }, token })
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" })

    }
}
export const getMe = async (req, res) => {
    const token = req.header("Authorization").split(" ")[1]
    const payload = decodeToken(token)
    if (!payload) return res.status(401).json({ message: "token not valid" })
    try {
        const user = await userModel.findById(payload.id).lean()
        const { first_name: firstName, last_name: lastName, username } = user
        res.json({
            data: { firstName, lastName, username }
        })
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" })
    }
}
