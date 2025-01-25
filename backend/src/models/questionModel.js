const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: String,
  title: String,
  anagramType: String,
  blocks: Array,
  solution: String,
  siblingId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Question", questionSchema);
