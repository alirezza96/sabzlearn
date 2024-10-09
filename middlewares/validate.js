export default function validate(schema) {
    return (req, res, next) => {
        const validationResult = schema.safeParse(req.body);
        if (!validationResult.success) return res.status(400).json({
            message: validationResult.error.errors[0].message || "validation failed",
            errors: validationResult.error.flatten().fieldErrors
        })
        req.body = validationResult.data
        next()
    }


}