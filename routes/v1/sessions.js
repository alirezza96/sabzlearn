import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import { create } from "../../controllers/v1/sessions.js";
import multer from "multer";
import storage from "../../utils/uploader.js";
const router = Router()

router.route("/")
    .post(auth, isAdmin,multer({storage}).single("file") , create)




export default router