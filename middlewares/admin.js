export default function isAdmin(req, res, next) {
    try {
        const isAdmin = req.user.role === "admin"
        if (!isAdmin) return res.status(401).json({ message: "access denied; only admins access" })
        next()
    } catch (err) {
        console.log("error middlewares/admin")
        res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}