import z from "zod"
const schema = z.object({
    name: z.string().trim().min(5).max(20),
    email: z.string().email(),
    phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    isAnswered: z.boolean().optional(),
    body: z.string().trim().min(5).max(200)
}).strict()

export const answeredSchema = schema.pick({ isAnswered: true, body: true })
export default schema