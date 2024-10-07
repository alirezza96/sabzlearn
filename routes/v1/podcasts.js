import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import { create } from "../../controllers/v1/podcasts.js"
import multer from "multer";
import storage from "../../utils/uploader.js";
import { create as createSession } from "../../controllers/v1/sessions.js";
const router = Router()

router.route("/")
    .post(auth, isAdmin, multer({
        storage, limits: {
            fileSize: 10000000000000,

        }
    }).single("cover"), create)

router.route("/:id/session")
    .post(auth, isAdmin, multer({ storage }).single("file"), createSession)


export default router