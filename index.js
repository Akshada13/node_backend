//const express = require('express');
import express from "express"; // latest syntax - type: module
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
const app = express();

dotenv.config();
const PORT = 5000;


//Tell express that what format of data you are going to get- json, xm, text
//Middleware - gatekeeper
//all the request -express.json() converted to body - into json
app.use(express.json());
//express.json()-inbuilt middleware
//3rd party middleware
//custom middleware
console.log(process.env);
async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
  
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Successfully connected!!!");
  return client;
}

   

//Rest Methods-
//Create-Post
//Read-Get
//Update-Put/Patch
//Delete-Delete

app.get("/", (request, response) => {
    response.send("Hello All!!!");
});

app.get("/users/:id", async (request, response) => {
    console.log(request.params);
    //const id = request.params.id;
    const { id } = request.params;

    const client = await createConnection();
    const user = await client
       .db("users")
       .collection("people")
       .findOne({id: id});

       console.log(user);
    response.send(user);
});

//Delete User
app.delete("/users/:id", async (request, response) => {
  console.log(request.params);
  //const id = request.params.id;
  const { id } = request.params;

  const client = await createConnection();
  
  const user = await client
     .db("users")
     .collection("people")
     .deleteOne({id: id});

     console.log(user);
     response.send(user);
});

//Update User
//Id-identify the person, new data(new color)
app.patch("/users/:id", async (request, response) => {
  console.log(request.params);
  //const id = request.params.id;
  const { id } = request.params;

  const client = await createConnection();
  const newData = request.body;
  console.log(id, request.body);

  const user = await client
     .db("users")
     .collection("people")
     .updateOne({ id: id }, { $set: newData });

     console.log(user);
     response.send(user);
  
});

app.get("/users", async (request, response) => {
    //const { color, ageGt } = request.query;
    const client = await createConnection();
    const users = await client
      .db("users")
      .collection("people")
      .find({})
      .toArray();
    console.log(users);
    response.send(users);
    
});
//create user
app.post("/users", async (request, response) => {
  //const { color, ageGt } = request.query;
  const client = await createConnection();
//console.log(request.body);
  const addUsers = request.body;
  
  const result = await client
    .db("users")
    .collection("people")
    .insertMany(addUsers);
  
    console.log(addUsers, result);
    response.send(result);
  
});

app.listen(PORT, ()=> console.log("The server is started in ", PORT));