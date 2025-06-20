const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookies = require("cookie-parser");
const fileUpload = require("express-fileupload");

const DbConnection = require("./config/db");

// import route
const autheRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const subsectionRoutes = require("./routes/subSectionRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const PORT = process.env.PORT || 5000;
DbConnection();

// create Route here
app.use("/api/v1/auth", autheRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/subsection", subsectionRoutes)

app.listen(PORT, () => {
  console.log(`App Running at : ${PORT}`);
});

// default Routes
app.get("/", (req, res) => {
  res.send("This is Home Page");
});
