const { searchQuestions } = require("../services/questionService");

async function searchQuestionsHandler(call, callback) {
  const { query, page, pageSize } = call.request;
  const { questions, totalPages } = await searchQuestions(
    query,
    page,
    pageSize
  );
  callback(null, {
    questions: questions.map((q) => ({
      id: q._id.toString(),
      type: q.type,
      title: q.title,
    })),
    totalPages,
    currentPage: page,
  });
}

module.exports = { searchQuestionsHandler };
