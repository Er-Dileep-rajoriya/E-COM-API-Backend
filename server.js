import "./env.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import ProductRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartItemRouter from "./src/features/cart/cartItem.routes.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import connectToMongodb from "./src/config/mongodbConfig.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import ApplicationError from "./src/error-handler/applicationError.js";
const port = 3100;

const server = express();

// middleware to set the CORS(Cross-Origin Resource Sharing) Policy
server.use(
  cors({
    origin: "*", // or http://localhost:5500
  })
);

server.set(express.static("public"));

server.use(bodyParser.json());

// using logger middleware to log the request
server.use(loggerMiddleware);

server.use("/api/products", jwtAuth, ProductRouter);
server.use("/api/users", userRouter);
server.use("/api/cartItems", jwtAuth, cartItemRouter);

server.get("/", (req, res) => {
  return res.send("Welcome to E-COMMERCE-API Project");
});

// Middleware to handle api which does not exists
server.use((req, res) => {
  return res.status(404).send("API Does not Exists, Pls Correct Your Url!");
});

// Application level Error Handling using express.js
server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code).send("Error : ", err.message);
  }

  console.log(err);
  return res.status(503).send("Something went wrong, pls try again later!");
});

server.listen(port, () => {
  console.log("Server is Running on Port : ", port);
  connectToMongodb();
});
