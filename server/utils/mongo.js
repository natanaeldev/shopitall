require("dotenv").config();
const mongoose = require("mongoose");

//Conection to the mongoose database

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDb conection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongoDB() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  connectMongoDB,
};
