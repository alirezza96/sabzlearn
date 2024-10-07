import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import {create} from "../../controllers/v1/artists.js"
const router = Router()

router.route("/")
    .post(auth, isAdmin, create)


export default router