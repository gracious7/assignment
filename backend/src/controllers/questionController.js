const { searchQuestions } = require("../services/questionService");
const grpc = require("@grpc/grpc-js");

async function searchQuestionsHandler(call, callback) {
  try {
    const { query, page = 1, pageSize = 10 } = call.request;
    const { questions, totalPages } = await searchQuestions(
      query,
      page,
      pageSize
    );

    callback(null, {
      questions: questions.map((q) => ({
        id: q._id.toString(), // Ensure this maps correctly
        type: q.type,
        title: q.title,
      })),
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      details: `Error occurred: ${err.message}`,
    });
  }
}

module.exports = { searchQuestionsHandler };
