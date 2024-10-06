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
        required: true
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

schema.virtual("podcasts", {
    ref: "podcast",
    localField: "_id",
    forigenField: "artist_id"
})

const albumsModel = model("Album", schema)
export default albumsModel