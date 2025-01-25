import React, { useState } from "react";
import { grpc } from "@improbable-eng/grpc-web";
import { QuestionService } from "../proto/question_pb_service";
import { SearchRequest } from "../proto/question_pb";
import "./SearchBox.css";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);

    const request = new SearchRequest();
    request.setQuery(query);

    grpc.unary(QuestionService.SearchQuestions, {
      request,
      host: "http://localhost:50051", // Ensure gRPC-web proxy is configured
      onEnd: (response) => {
        setLoading(false);

        if (response.status === grpc.Code.OK && response.message) {
          setResults(response.message.getQuestionsList());
        } else {
          console.error("Error fetching data:", response.statusMessage);
        }
      },
    });
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
        className="search-input"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="search-button"
      >
        {loading ? "Loading..." : "Search"}
      </button>

      <div className="results">
        {results.map((question) => (
          <div key={question.getId()} className="result-card">
            <h3>{question.getTitle()}</h3>
            <p>Type: {question.getType()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBox;
