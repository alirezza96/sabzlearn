import { Schema, model } from "mongoose"

const schema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    shortName: {
        type: String,
        required: true,
        unique: true
    }
})

const categoriesModel = model("Category", schema)
export default categoriesModel
