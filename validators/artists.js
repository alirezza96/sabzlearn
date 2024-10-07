import z from "zod"

const schema = z.object({
    title: z.string().trim().min(5),
    shortName: z.string().trim().min(5)
}).strict()

export default schema