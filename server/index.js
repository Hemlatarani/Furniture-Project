// // require("dotenv").config(); // ✅ sabse pehli line ye hi honi chahiye
// require("dotenv").config();
// let express = require("express")
// let mongoose = require("mongoose")
// let App = express()
// let cors = require("cors")
// const { adminRoutes } = require("./App/routes/admin/adminRoutes")
// const { adminModel } = require("./App/models/adminModel")
// const { webRoutes } = require("./App/routes/website/webRoutes")
// App.use(cors())
// App.use((req, res, next) => {
//   res.setHeader(
//     "Cross-Origin-Opener-Policy",
//     "same-origin-allow-popups"
//   );
//   next();
// });
// App.use(express.json())
// App.use(express.urlencoded({ extended: true }))

// //webRoutes
// App.use("/admin", adminRoutes)

// //upload folder  allow for react frontend
// App.use("/uploads/category", express.static("uploads/category"))
// App.use("/uploads/product", express.static("uploads/product"))
// App.use("/uploads/subcategory", express.static("uploads/subcategory"))
// App.use("/uploads/subsubcategory", express.static("uploads/subsubcategory"))


// App.use("/web", webRoutes)

// // mongoose.connect(process.env.DBCONNECTION)
// // // console.log("mongoose connnect succussfully")
// // App.listen(process.env.PORT,  () => {
// //   console.log('Server Start');

// // })
// // .then(()=>{

// //   // fconsole.log(process.env.PORT)

// // })
// // mongoose.connect(process.env.DBCONNECTION)
// // .then(() => {
// //   console.log("Mongoose connected successfully");
// //   App.listen(process.env.PORT, () => {
// //     console.log(`Server is running on port ${process.env.PORT}`);
// //   });
// // })
// // .catch((err) => {
// //   console.error("Error connecting to MongoDB:", err);
// // });


// mongoose.connect(process.env.DBCONNECTION)
//   .then(async (res) => {
//     console.log(` Server running at http://localhost:${process.env.PORT}`);
//     console.log(" MongoDB Connected Successfully");



//     let checkAdmin = await adminModel.findOne()
//     if (!checkAdmin) {
//       await adminModel.insertOne({
//         adminEmail: process.env.ADMINEMAIL,
//         adminPassword: process.env.ADMINPASSWORD
//       })
//     }
    
//     App.get("/", (req, res) => {
//   res.send("Backend is running successfully");
// });
//     // App.listen(process.env.PORT, () => {
//     //   console.log("server Started");
//     // });
//   })
//   .catch((error) => {
//     console.log(" MongoDB Connection Error:", error.message);
//   });


// module.exports=(App)
require("dotenv").config();

let express = require("express");
let mongoose = require("mongoose");
let App = express();
let cors = require("cors");

const { adminRoutes } = require("./App/routes/admin/adminRoutes");
const { adminModel } = require("./App/models/adminModel");
const { webRoutes } = require("./App/routes/website/webRoutes");

App.use(cors());

App.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  next();
});

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// HOME ROUTE
App.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// ADMIN ROUTES
App.use("/admin", adminRoutes);

// UPLOAD FOLDERS
App.use("/uploads/category", express.static("uploads/category"));
App.use("/uploads/product", express.static("uploads/product"));
App.use("/uploads/subcategory", express.static("uploads/subcategory"));
App.use("/uploads/subsubcategory", express.static("uploads/subsubcategory"));

// WEBSITE ROUTES
App.use("/web", webRoutes);


// MONGODB CONNECTION
mongoose
  .connect(process.env.DBCONNECTION)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    let checkAdmin = await adminModel.findOne();

    if (!checkAdmin) {
      await adminModel.insertOne({
        adminEmail: process.env.ADMINEMAIL,
        adminPassword: process.env.ADMINPASSWORD,
      });
    }
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });


// EXPORT APP FOR VERCEL
module.exports = App;