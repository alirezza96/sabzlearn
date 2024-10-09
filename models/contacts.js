import { Schema, model } from "mongoose"

const schema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAnswered: {
        type: Boolean,
        default: false
    },
    body: {
        type: String,
        required: true
    }
},
{
    timestamps:true
})

const contactModel = model("Contact", schema)
export default contactModel