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
export const decrypt = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        compare(password, hashedPassword, (error, result) => {
            if (error) return reject(error.message)
            resolve(result)
        })
    })
}





const privateKey = process.env.PRIVATE_KEY
export const generateToken = (data) => {
    return jwt.sign(data, privateKey, { expiresIn: "1h" })
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, privateKey)
    } catch (error) {
        return false
    }
}