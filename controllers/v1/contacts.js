import contactModel from "../../models/contacts.js"
import sendEmail from "../../utils/sendEmail.js"
import schema, { answeredSchema } from "../../validators/contacts.js"

export const find = async (req, res) => {
    const contacts = await contactModel.find().lean()
    if (!contacts.length) return res.status(404).json({
        message: "contacts not found"
    })
    res.json({
        data: contacts
    })
}

export const create = async (req, res) => {
    const validationResult = schema.safeParse(req.body)
    if (!validationResult.success) return res.status(401).json({
        message: validationResult.error.errors[0].message || "validation failed",
        errors: validationResult.error.flatten().fieldErrors
    })
    const contact = await contactModel.create(req.body)
    res.status(201).json({
        message: "contact created"
    })
}

export const answered = async (req, res) => {
    const { isAnswered, body } = req.body
    const { id } = req.params
    const validationResult = answeredSchema.safeParse({ isAnswered, body })
    if (!validationResult.success) return res.status(401).json(
        {
            message: "validation failed",
            errors: validationResult.error.flatten().fieldErrors
        }
    )
    const contact = await contactModel.findById(id, "isAnswered email")
    if (!contact) return res.status(404).json({
        message: "contact not found"
    })
    if (contact.isAnswered) return res.status(409).json({
        message: "contact already answered"
    })
    const updateContact = await contactModel.findByIdAndUpdate(id, { isAnswered: true })
    const sentMail = await sendEmail({
        to: contact.email,
        subject: "subject of subject",
        text: body
    })
    console.log("sentMail =>", sentMail)
    res.status(201).json({
        message: "answered"
    })

}