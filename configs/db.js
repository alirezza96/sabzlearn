
import mongoose from "mongoose"
import "dotenv/config"

const connection = {}
mongoose.connect(process.env.MONGO_URI)
    .then(db => {
        connection.isConnected = db.connections[0].readyState
        console.log("database connected")
    })
    .catch(err => console.log("connaction to database failed"))