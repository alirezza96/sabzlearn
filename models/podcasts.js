import { Schema, Types, model } from "mongoose";

const schema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true,
    },
    isFree: {
        type: Boolean,
        default: true
    },
    isRelease: {
        type: Boolean,
        default: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category"
    },
    artistId: {
        type: Types.ObjectId,
        ref: "Artist"
    }
}, {
    timestamps: true
})

schema.virtual("sessions", {
    ref: "Session",
    localField: "_id",
    foreignField: "podcastId"
})

schema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "podcastId"
})
const podcastsModel = model("Podcast", schema)
export default podcastsModel