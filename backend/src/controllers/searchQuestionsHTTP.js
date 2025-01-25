const { searchQuestions } = require("../services/questionService");

async function searchQuestionsHTTP(req, res) {
  try {
    const { query, page, pageSize } = req.body;
    const { questions, totalPages } = await searchQuestions(
      query,
      page,
      pageSize
    );

    res.json({
      questions: questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        title: q.title,
      })),
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in HTTP endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { searchQuestionsHTTP };
