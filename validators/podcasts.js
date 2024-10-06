import { z } from "zod";

const schema = z.object({
    title: z.string().trim().min(2).max(15),
    isFree: z.boolean(),
    file: z.file(),
    artistId: z.string().optional()
}).strict()

export default schema