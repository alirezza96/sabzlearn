import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import { create } from "../../controllers/v1/podcasts.js"
import multer from "multer";
import storage from "../../utils/uploader.js";
const router = Router()

router.route("/")
    .post( multer({
        storage, limits: {
            fileSize: 10000000000000,

        }
    }).single("cover"), create)


export default router