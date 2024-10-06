import express from 'express'
import authRouter from "./routes/v1/auth.js"
import userRouter from "./routes/v1/users.js"
import auth from './middlewares/auth.js'

const app = express()
app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", auth, userRouter)


// page not found
app.use((req, res) => {
    res.status(404).json({ message: "page not found" })

})


export default app