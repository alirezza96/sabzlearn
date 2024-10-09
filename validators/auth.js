import * as z from "zod"

const schema = z.object({
    firstName: z.string().trim().min(2).max(10),
    lastName: z.string().trim().min(2).max(10),
    username: z.string().trim().min(4).max(10),
    email: z.string().email(),
    phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    password: z.string().trim().min(4).max(20).regex(/[a-zA-z]/).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/),
    confirmPassword: z.string().optional()
}).strict()


export const registerSchema = schema.refine((value) => {
    if (value.confirmPassword) {
        return value.password === value.confirmPassword;
    }
    return true
}, {
    message: "Those passwords didn’t match. Try again.",
    path: ["confirmPassword"],
});
export const loginSchema = schema.pick({
    username: true,
    password: true
});





export const authValidator = (req) => registerSchema.safeParse(req)