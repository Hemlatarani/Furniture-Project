require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const App = express();

const { adminRoutes } = require("./App/routes/admin/adminRoutes");
const { webRoutes } = require("./App/routes/website/webRoutes");
const { adminModel } = require("./App/models/adminModel");

// CORS
App.use(cors());

// Middleware
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
  res.status(200).send("Backend is running successfully");
});

// ADMIN ROUTES
App.use("/admin", adminRoutes);

// WEBSITE ROUTES
App.use("/web", webRoutes);

// UPLOAD FOLDERS
App.use(
  "/uploads/category",
  express.static("uploads/category")
);

App.use(
  "/uploads/product",
  express.static("uploads/product")
);

App.use(
  "/uploads/subcategory",
  express.static("uploads/subcategory")
);

App.use(
  "/uploads/subsubcategory",
  express.static("uploads/subsubcategory")
);

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

      console.log("Admin created successfully");
    }
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });

module.exports = App;