let express = require("express")
const multer = require('multer')

const { categoryCreate, categoryView, categoryDelete, categoryUpdate, categoryMultidelete, catsingleData, categoryStatusUpdate } = require("../../controllers/admin/categoryController")

let categoryRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,"uploads/category")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({ storage: storage })


categoryRoutes.post("/create", upload.single('categoryImage'),categoryCreate)
categoryRoutes.get("/view",categoryView)
categoryRoutes.delete("/delete/:id",categoryDelete)
categoryRoutes.get("/edit-category/:id",catsingleData)
categoryRoutes.put("/update/:id", upload.single('categoryImage'), categoryUpdate)
categoryRoutes.put("/status-update",categoryStatusUpdate)
categoryRoutes.post("/multi-delete",categoryMultidelete)

module.exports = { categoryRoutes }