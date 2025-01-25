import React from "react";

const QuestionList = ({ questions }) => {
  return (
    <div className="question-list">
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <h3>{question.title}</h3>
          <p>Type: {question.type}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
