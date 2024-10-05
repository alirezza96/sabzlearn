import { Router } from "express";
import {banUser} from "../../controllers/v1/users.js"
const router = Router()

router.put("/ban/:id", banUser)

export default router