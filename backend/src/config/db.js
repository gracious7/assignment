const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(
      `mongodb+srv://krisha123:krisha123@cluster0.adqxs.mongodb.net/questions`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = { dbConnect };
