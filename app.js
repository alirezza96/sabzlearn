import express from 'express'
import auth from './middlewares/auth.js'
import authRouter from "./routes/v1/auth.js"
import userRouter from "./routes/v1/users.js"
import categoryRouter from "./routes/v1/categories.js"
import podcastRouter from "./routes/v1/podcasts.js"


const app = express()
// biltin
app.use(express.json())
app.use(express.)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", auth, userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/podcasts", podcastRouter)


// page not found
app.use((req, res) => {
    res.status(404).json({ message: "page not found" })

})


export default app