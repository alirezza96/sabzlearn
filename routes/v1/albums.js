import { Router } from "express"
import { create } from "../../controllers/v1/albums.js"
const router = Router()

router.route("/")
    .post(create)



export default router