import salesModel from "../../models/sales.js"
import schema from "../../validators/sales.js"

export const createSale = async (req, res) => {
  const { id: podcastId } = req.params
  const { id: userId } = req.user
  const { price } = req.body

  const validationResult = schema.safeParse({ userId, podcastId, price })

  if (!validationResult.success) return res.status(401).json({
    message: "validation failed",
    errors: validationResult.error.flatten().fieldErrors
  })
  //is soled
  const isSoled = await salesModel.findOne({ userId, podcastId })
  if (isSoled) return res.status(409).json({
    message: "user already soled this podcast"
  })
  const sale = await salesModel.create({ userId, podcastId, price })
  res.status(201).json({
    message: "podcast sold"
  })
}