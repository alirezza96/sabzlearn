import { Router } from "express";
import { findByTitle, create, find, update, remove } from "../../controllers/v1/categories.js";
import auth from "../../middlewares/auth.js";
import isAdmin from "../../middlewares/admin.js";
import objectId from "../../middlewares/objectId.js";
import validate from "../../middlewares/validate.js";
import schema from "../../validators/categories.js";
const router = Router()

router.route("/:id")
    .get(findByTitle)
    .put(objectId, auth, isAdmin, validate(schema), update)
    .delete(objectId, auth, isAdmin, remove)
router.route("/")
    .post(auth, isAdmin, validate(schema), create)
    .get(find)

export default router