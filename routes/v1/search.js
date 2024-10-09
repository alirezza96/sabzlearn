import { Router } from "express";
import { find } from "../../controllers/v1/search.js";
const router = Router()

router.route("/")
    .get(find)


export default router