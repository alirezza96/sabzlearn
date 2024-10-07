import multer from "multer";
import path from "path"
import { fileURLToPath } from "url"
import crypto from "crypto"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"))
    },
    filename: (req, file, cb) => {
        const hashedFileName = crypto.createHash("SHA256").update(file.originalname).digest("hex")
        const ext = path.extname(file.originalname)
        cb(null, `${hashedFileName}${ext}`)
    }
})

export default storage