import { model, Types, Schema } from "mongoose";

const schema = Schema({
    body: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isReply: {
        type: Boolean,
        default: false
    },
    mainCommentId: {
        type: Types.ObjectId,
        rel: "Comment"
    },
    podcastId: {
        type: Types.ObjectId,
        rel: "Podcast"
    },
    userId: {
        type: Types.ObjectId,
        rel: "User"
    },
}, { timestamps: true })

const commentsModel = model("Comment", schema)
export default commentsModel