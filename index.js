// express - server
// const express = require("express"); // third party package  type: commonjs
import cors from "cors";
import dotenv from "dotenv";
import express from "express"; // latest syntax - type: module
// .js at end MUST
import { managerRouter } from "./routes/manager.js";
import { usersRouter } from "./routes/users.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT; // Heroku will fill automatically
// middleware data -> json format
app.use(express.json());
app.use(cors());

// Checks all the requests for valid token
// custom middleware

app.get("/", (request, response) => {
  response.send("Hello, All :) !!!");
});

app.use("/managers", managerRouter);
app.use("/users", usersRouter);


app.listen(PORT, () => console.log("The server is started in ", PORT));