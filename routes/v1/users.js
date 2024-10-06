import { Router } from "express";
import { banUser, find, remove, role, update } from "../../controllers/v1/users.js"
import objectId from "../../middlewares/objectId.js"
import isAdmin from "../../middlewares/admin.js";
const router = Router()

router.put("/ban/:id", isAdmin,objectId, banUser)
router.put("/role/:id", isAdmin, objectId, role)
router.route("/")
    .get(find)
    .put(update)
router.route("/:id")
    .delete(objectId, isAdmin, remove)
export default router