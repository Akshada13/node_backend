import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

async function getUsers(client) {
  return await client.db("users").collection("people").find({}).toArray();
}

async function getMovies(client) {
  return await client.db("users").collection("movies").find({}).toArray();
}

async function createUsers(client, addUsers) {
  return await client.db("users").collection("people").insertMany(addUsers);
}

async function createMovies(client, addMovies) {
  return await client.db("users").collection("movies").insertMany(addMovies);
}

async function updateUserById(client, id, newData) {
  return await client
    .db("users")
    .collection("people")
    .updateOne({ id: id }, { $set: newData });
}

async function deleteUserById(client, id) {
  return await client.db("users").collection("people").deleteOne({ id: id });
}

async function getUserById(client, id) {
  return await client.db("users").collection("people").findOne({ id: id });
}

async function createManager(client, username, hashedPassword) {
  return await client
    .db("users")
    .collection("managers")
    .insertOne({ username: username, password: hashedPassword });
}

async function getManagers(client) {
  return await client.db("users").collection("managers").find({}).toArray();
}

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function createConnection() {
    // const MONGO_URL = "mongodb://localhost/users";
    const MONGO_URL = process.env.MONGO_URL;
    console.log(MONGO_URL);
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Successfully connected!!!");
    return client;
  }


export {
  createManager,
  createUsers,
  deleteUserById,
  getManagers,
  getUserById,
  getUsers,
  updateUserById,
  genPassword,
  createConnection,
};