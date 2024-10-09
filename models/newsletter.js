import { model } from "mongoose";
const schema = {
    email: {
        type: String,
        required: true,
        unique: true
    }
}

const newsletterModel = model("Newsletter", schema)
export default newsletterModel