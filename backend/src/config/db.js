const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect("mongodb://localhost:27017/questions", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = { dbConnect };
