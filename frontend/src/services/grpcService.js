// import grpc from "grpc";
// import protoLoader from "@grpc/proto-loader";

// const PROTO_PATH = "./question.proto"; // Adjust the path accordingly

// const packageDefinition = protoLoader.loadSync(PROTO_PATH);
// const questionProto =
//   grpc.loadPackageDefinition(packageDefinition).QuestionService;

// const client = new questionProto(
//   "localhost:50051",
//   grpc.credentials.createInsecure()
// );

// export const searchQuestions = (query, page, pageSize) => {
//   return new Promise((resolve, reject) => {
//     client.SearchQuestions({ query, page, pageSize }, (error, response) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };
import axios from "axios";

export const searchQuestions = async (query, page, pageSize) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/QuestionService/SearchQuestions",
      {
        query,
        page,
        pageSize,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
