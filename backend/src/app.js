const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const { searchQuestionsHandler } = require("./controllers/questionController");
const { dbConnect } = require("./config/db");

const PROTO_PATH = __dirname + "/routes/question.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const questionProto =
  grpc.loadPackageDefinition(packageDefinition).QuestionService;

const server = new grpc.Server();
server.addService(questionProto.service, {
  SearchQuestions: searchQuestionsHandler,
});

dbConnect();
const PORT = 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`gRPC server running on port ${PORT}`);
    server.start();
  }
);
