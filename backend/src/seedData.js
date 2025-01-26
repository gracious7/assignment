const mongoose = require("mongoose");
const Question = require("./models/questionModel");
const rawData = require("./questions.json");

// Transform the `$oid` fields into plain strings
const data = rawData.map((item) => {
  if (item._id && item._id["$oid"]) {
    item._id = item._id["$oid"];
  }
  if (item.siblingId && item.siblingId["$oid"]) {
    item.siblingId = item.siblingId["$oid"];
  }
  return item;
});

mongoose
  .connect(
    "mongodb+srv://krisha123:krisha123@cluster0.adqxs.mongodb.net/questions"
  )
  .then(async () => {
    console.log("MongoDB connected");
    await Question.deleteMany({}); // Optional: Clear the collection
    await Question.insertMany(data);
    console.log("Data seeded successfully");
    process.exit();
  })
  .catch((err) => console.error(err));
