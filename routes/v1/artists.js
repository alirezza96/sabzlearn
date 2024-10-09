import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import { create } from "../../controllers/v1/artists.js"
import validate from "../../middlewares/validate.js";
import schema from "../../validators/artists.js";
const router = Router()

router.route("/")
    .post(auth, isAdmin, validate(schema), create)


export default router