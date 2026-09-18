// let express = require("express")
// const multer = require('multer')

// const { categoryCreate, categoryView, categoryDelete, categoryUpdate, categoryMultidelete, catsingleData, categoryStatusUpdate } = require("../../controllers/admin/categoryController")

// let categoryRoutes = express.Router()

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null,"uploads/category")
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })
// const upload = multer({ storage: storage })


// categoryRoutes.post("/create", upload.single('categoryImage'),categoryCreate)
// categoryRoutes.get("/view",categoryView)
// categoryRoutes.delete("/delete/:id",categoryDelete)
// categoryRoutes.get("/edit-category/:id",catsingleData)
// categoryRoutes.put("/update/:id", upload.single('categoryImage'), categoryUpdate)
// categoryRoutes.put("/status-update",categoryStatusUpdate)
// categoryRoutes.post("/multi-delete",categoryMultidelete)

// module.exports = { categoryRoutes }
let express = require("express")

const multer = require('multer')

const {
    categoryCreate,
    categoryView,
    categoryDelete,
    categoryUpdate,
    categoryMultidelete,
    catsingleData,
    categoryStatusUpdate
} = require("../../controllers/admin/categoryController")

let categoryRoutes = express.Router()

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        console.log("MULTER DESTINATION RUNNING")
        console.log("FILE:", file)

        cb(null, "/uploads/category")

    },

    filename: function (req, file, cb) {

        console.log("MULTER FILENAME RUNNING")
        console.log("FILE:", file)

        cb(null, Date.now() + file.originalname)

    }

})

const upload = multer({ storage: storage })


categoryRoutes.post(
    "/create",

    (req, res, next) => {
        console.log("🔥🔥🔥 CATEGORY POST ROUTE HIT 🔥🔥🔥")
        console.log("METHOD:", req.method)
        console.log("URL:", req.originalUrl)
        next()
    },

    upload.single("categoryImage"),

(err, req, res, next) => {
    if (err) {
        console.error("🔥🔥🔥 MULTER ERROR 🔥🔥🔥")
        console.error("ERROR NAME:", err.name)
        console.error("ERROR MESSAGE:", err.message)
        console.error("FULL ERROR:", err)

        return res.status(500).json({
            status: 0,
            msg: "Multer Error",
            error: err.message
        })
    }

    next()
},

(req, res, next) => {
    console.log("🔥🔥🔥 MULTER SUCCESS 🔥🔥🔥")
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    next()
},

categoryCreate

)

categoryRoutes.get("/view", categoryView)

categoryRoutes.delete("/delete/:id", categoryDelete)

categoryRoutes.get("/edit-category/:id", catsingleData)

categoryRoutes.put(
    "/update/:id",
    upload.single('categoryImage'),
    categoryUpdate
)

categoryRoutes.put("/status-update", categoryStatusUpdate)

categoryRoutes.post("/multi-delete", categoryMultidelete)

module.exports = { categoryRoutes }