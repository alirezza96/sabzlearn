import { Router } from "express";
import { create } from "../../controllers/v1/newsletter.js";
const router = Router()

router.route("/")
    .post(create)


export default router