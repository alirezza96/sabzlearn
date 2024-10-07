import z from "zod"
import { objectIdSchema } from "../utils/helper.js"

const schema = z.object({
    title: z.string().trim().min(5).max(15),
    description: z.string().trim().min(20),
    shortName: z.string().trim().min(4),
    isFree: z.boolean().optional(),
    isRelease: z.boolean().optional(),
    categoryId: objectIdSchema,
    artistId: objectIdSchema
}).strict()

export default schema