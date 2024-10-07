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

// schema.virtual("artists", {
//     ref: "Artist",
//     localField: "_id",
//     foreignField: "artistId"
// })

// schema.virtual("comments", {
//     ref: "Comment",
//     localField: "_id",
//     foreignField: "albumId"
// })
const podcastsModel = model("Podcast", schema)
export default podcastsModel