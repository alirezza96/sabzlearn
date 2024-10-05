import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

export const encrypt = (data) => {
    return new Promise((resolve, reject) => {
        hash(data, 10, (error, hashedData) => {
            if (error) return reject(error.message)
            resolve(hashedData)
        })
    }
    )
}
const privateKey = process.env.PRIVATE_KEY
export const generateToken = (data) => {
    return jwt.sign(data, privateKey, { expiresIn: "1h" })
} 