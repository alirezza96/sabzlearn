import { Schema, model } from "mongoose";

const schema = Schema({
    title: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
        unique: true
    }
})

const artistsModel = model("Artist", schema)
export default artistsModel