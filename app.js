import express from 'express'
import auth from './middlewares/auth.js'
import authRouter from "./routes/v1/auth.js"
import userRouter from "./routes/v1/users.js"
import categoryRouter from "./routes/v1/categories.js"
import podcastRouter from "./routes/v1/podcasts.js"
import artistRouter from "./routes/v1/artists.js"
const app = express()
app.use(express.json())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", auth, userRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/podcasts", podcastRouter)
app.use("/api/v1/artists", artistRouter)



// page not found
app.use((req, res) => {
    res.status(404).json({ message: "page not found" })

})

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message || "Internal Server Error"
        })
})

export default app