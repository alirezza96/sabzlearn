import { z } from "zod";
import { objectIdSchema } from "../utils/helper.js";

const schema = z.object({
    title: z.string().trim().min(2).max(15),
    isFree: z.boolean().optional(),
    podcastId: objectIdSchema
}).strict()

export default schema