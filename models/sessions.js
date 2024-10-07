import { Schema, model, Types } from "mongoose";

const schema = Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true,
    },
    isFree: {
        type: Boolean,
        default: true
    },
    podcastId: {
        type: Types.ObjectId,
        ref: "Podcast"
    }
},
    {
        timestamps: true
    })

const sessionsModel = model("Session", schema)
export default sessionsModel