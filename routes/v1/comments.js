import { Router } from "express";
import { find, remove, confirmed } from "../../controllers/v1/comments.js"
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
const router = Router()
router.route("/")
    .get(find)
router.route("/:id")
    .delete(auth, isAdmin, remove)
router.route("/:id/confirmed")
    .put(auth, isAdmin, confirmed)

export default router