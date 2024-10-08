import { Schema, Types, model } from "mongoose"

const schema = Schema({
    podcastId: {
        type: Types.ObjectId,
        ref: "podcast",
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: "user",
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

const salesModel = model("Sale", schema)
export default salesModel