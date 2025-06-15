const mongoose = require("mongoose");
require("dotenv").config();

const DbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection is successful...");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error);
      process.exit(1); 
    });
};

module.exports = DbConnection;
