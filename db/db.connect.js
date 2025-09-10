/** @format */

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializingDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => console.log("Error connecting to Database"));
};

module.exports = { initializingDatabase };
