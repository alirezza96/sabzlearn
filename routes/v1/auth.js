import { Router } from "express"
import { register, login, getMe } from "../../controllers/v1/auth.js"
import validate from "../../middlewares/validate.js"
import { loginSchema, registerSchema } from "../../validators/auth.js"
const authRouter = Router()

authRouter.post("/register", validate(registerSchema), register)
authRouter.post("/login", validate(loginSchema), login)
authRouter.get("/getMe", getMe)

export default authRouter