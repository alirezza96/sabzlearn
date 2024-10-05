import { Router } from "express"
import { register, login, getMe } from "../../controllers/v1/auth.js"
const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("getMe", getMe)

export default authRouter