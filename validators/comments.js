import z from "zod"
import { objectIdSchema } from "../utils/helper.js"
const schema = z.object({
    body: z.string().trim().min(20),
    isConfirmed: z.boolean().optional(),
    score: z.number().min(0).max(5),
    isReply: z.boolean().optional(),
    mainCommentId: objectIdSchema.optional(),
    podcastId: objectIdSchema,
    userId: objectIdSchema
}).strict()

export const createCommentSchema = schema
