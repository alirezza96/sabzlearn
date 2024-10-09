import z from "zod"
const schema = z.object({
    email: z.string().email()
}).strict()

export default schema