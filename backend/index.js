const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookies = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
// const path = require("path");

const DbConnection = require("./config/db");

// import route
const autheRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const ratingAndreview = require("./routes/ratingandreview");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://mka-edtech.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
app.use("/api/v1/rating", ratingAndreview);

// // Serve static files
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`App Running at : ${PORT}`);
});

// default Routes
app.get("/", (req, res) => {
  res.send("This is Home Page");
});
