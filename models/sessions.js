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
    artistId: {
        type: Types.ObjectId,
        ref: "Artist"
    }
},
{
    timestamps: true
})

const songsModel = model("Podcast", schema)
export default songsModel