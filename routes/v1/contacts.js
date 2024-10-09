import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import { find, create, answered } from "../../controllers/v1/contacts.js"

const router = Router()

router.route("/")
    .get(auth, isAdmin, find)
    .post(auth, create)
router.route("/:id/answered")
    .put(answered)

export default router