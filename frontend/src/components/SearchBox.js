// import React, { useState } from "react";
// import { grpc } from "@improbable-eng/grpc-web";
// import {
//   SearchQuestionsRequest,
//   QuestionServiceClient,
// } from "../proto/question_pb_service";
// import { Question } from "../proto/question_pb";

// const SearchBox = () => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = () => {
//     setLoading(true);
//     const client = new QuestionServiceClient("http://localhost:50051"); // Backend gRPC server URL

//     const request = new SearchQuestionsRequest();
//     request.setQuery(query);

//     client.searchQuestions(request, {}, (error, response) => {
//       setLoading(false);
//       if (error) {
//         console.error(error);
//         return;
//       }
//       setResults(response.getQuestionsList());
//     });
//   };

//   return (
//     <div className="search-box">
//       <input
//         type="text"
//         placeholder="Search questions..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch} disabled={loading}>
//         {loading ? "Searching..." : "Search"}
//       </button>

//       {results.length > 0 && (
//         <div className="results">
//           {results.map((question, index) => (
//             <div key={index} className="result-item">
//               <h3>{question.getTitle()}</h3>
//               <p>{question.getType()}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBox;

import React, { useState } from "react";
import { QuestionServiceClient } from "../proto/question_grpc_web_pb";
import { SearchRequest } from "../proto/question_pb";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const client = new QuestionServiceClient(
    "http://localhost:50051",
    null,
    null
  );

  const handleSearch = () => {
    const request = new SearchRequest();
    request.setQuery(query);

    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        console.error("Error:", err.message);
        return;
      }

      setResults(
        response.getQuestionsList().map((q) => ({
          id: q.getId(),
          title: q.getTitle(),
          type: q.getType(),
        }))
      );
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((question) => (
          <li key={question.id}>
            {question.title} ({question.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
