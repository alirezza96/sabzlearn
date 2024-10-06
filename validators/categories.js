import { z } from "zod";


const schema = z.object({
    title: z.string().trim().min(3).max(15),
    shortName: z.string().trim().min(3).max(15)
}).strict()
export default schema 