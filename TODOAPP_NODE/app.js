const http = require("http");
const express = require("express");
const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
const {join} = require("path");
const userRouter = require("./routes/users");

const PORT = 3001;
const app = express();
const server = http.createServer(app);
const client = new MongoClient("mongodb://localhost:27017");
let db;

// mongoose.connect("mongodb://localhost:27017/ToDoDatabase");

const connectMongo = async () => {
  try {
    const mongoClient = await client.connect();
    db = mongoClient.db("ToDoDatabase");
    console.log(`Successfully connected to mongodb server`);
  } catch (error) {
    console.error(`Error connecting to mongodb server ${error.message}`);
  }
};

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
  
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.db = db;
  next();
})

app.use("/", userRouter);

// Error handler middleware aka Global error handler in express application
app.use((err, req, res, next) => {
  res.statusCode = 500;
  res.statusMessage = 'Internal Server Error'
  return res.send(err.message);
})

server.listen(PORT, async () => {
  await connectMongo();
  console.log(`Express application running at http://localhost:${PORT}`);
});
