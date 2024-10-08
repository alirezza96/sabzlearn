import z from "zod"
import { objectIdSchema } from "../utils/helper.js"

const schema = z.object({
    podcastId: objectIdSchema,
    userId: objectIdSchema,
    price: z.number()
}).strict()
export default schema