const Question = require("../models/questionModel");

async function searchQuestions(query, page, pageSize) {
  const regex = new RegExp(query, "i");
  const questions = await Question.find({ title: regex })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  const totalCount = await Question.countDocuments({ title: regex });
  return { questions, totalPages: Math.ceil(totalCount / pageSize) };
}

module.exports = { searchQuestions };
