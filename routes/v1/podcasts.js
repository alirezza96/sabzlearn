import { Router } from "express";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import { create, find, findOne, findRelatedPodcasts } from "../../controllers/v1/podcasts.js"
import multer from "multer";
import storage from "../../utils/uploader.js";
import { createSession, findSession, findOneSession } from "../../controllers/v1/sessions.js";
import { createComment } from "../../controllers/v1/comments.js"
import { createSale } from "../../controllers/v1/sales.js"
const router = Router()

router.route("/")
    .post(auth, isAdmin, multer({
        storage, limits: {
            fileSize: 10000000000000,

        }
    }).single("cover"), create)
    .get(auth, isAdmin, find)
router.route("/:shortName")
    .get(findOne)
router.route("/:shortName/comments")
    .post(auth, createComment)
router.route("/:shortName/related")
    .get(findRelatedPodcasts)
router.route("/:id/sessions")
    .post(auth, isAdmin, multer({ storage }).single("file"), createSession)

router.route("/sessions")
    .get(auth, isAdmin, findSession)

router.route("/:shortName/:sessionId")
    .get(findOneSession)

router.route("/:id/buy")
    .post(auth, createSale)
export default router