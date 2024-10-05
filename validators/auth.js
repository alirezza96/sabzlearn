import z from "zod"
const schema = z.object({
    firstName: z.string().trim().min(2).max(10),
    lastName: z.string().trim().min(2).max(10),
    username: z.string().trim().min(4).max(10),
    email: z.string().email(),
    phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    password: z.string().trim().min(4).max(20).regex(/[a-zA-z]/).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/),
    confirmPassword: z.string(),
}).strict().refine(value => value.password === value.confirmPassword , {
    message: "Those passwords didn’t match. Try again.",
    path: ["confirmPassword"]
})

export default schema