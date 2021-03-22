const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log("connected to mongodb");
      }
    );
  } catch (error) {
    console.log("mongoError", error.message);
  }
};

module.exports = dbConnection;
