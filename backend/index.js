const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookies = require("cookie-parser");

const DbConnection = require("./config/db");

// import route
const autheRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookies());

const PORT = process.env.PORT || 5000;
DbConnection();

// create Route here
app.use("/api/v1/auth", autheRoutes);

app.listen(PORT, () => {
  console.log(`App Running at : ${PORT}`);
});


// default Routes 
app.get("/", ()=>{
    mesaage : "this is Home Page"
})