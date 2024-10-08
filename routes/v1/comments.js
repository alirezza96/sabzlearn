import { Router } from "express";
import { remove } from "../../controllers/v1/comments.js"
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
const router = Router()

router.route("/:id")
    .delete(auth, isAdmin, remove)


export default router