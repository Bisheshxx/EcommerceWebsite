const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, (err) => {
    if (err) console.log(err);
    console.log("database is connected");
  });
};

module.exports = connectDatabase;
