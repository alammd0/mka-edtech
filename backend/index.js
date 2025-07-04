const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookies = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

const DbConnection = require("./config/db");

// import route
const autheRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookies());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;
DbConnection();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

// create Route here
app.use("/api/v1/auth", autheRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`App Running at : ${PORT}`);
});

// default Routes
app.get("/", (req, res) => {
  res.send("This is Home Page");
});
