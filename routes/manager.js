import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import {
  createConnection,
  createManager,
  genPassword,
  getManagers,
} from "../helper.js"; // .. back a folder & . current folder

// Routers - will helps organize into different files based on route
const router = express.Router();

// 1. import router
// 2. use the router (replace app with router)
// 3. export router & import in index.js (use in index.js)
// 4. replace paths

router.get("/", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const managers = await getManagers(client);
  response.send(managers);
});

router.post("/signup", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const { username, password } = request.body;
  const hashedPassword = await genPassword(password);
  const result = await createManager(client, username, hashedPassword);
  response.send(result);
});

router.post("/login", async (request, response) => {
  // const { color, age } = request.query;
  const client = await createConnection();
  const { username, password } = request.body;

  const result = await client
    .db("users")
    .collection("managers")
    .findOne({ username: username });
  console.log(result);

  const storedDbPassword = result.password;
  const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
  if (isPasswordMatch) {
    const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY);
    response.send({ message: "Successful login", token: token });
  } else {
    response.send({ message: "Invalid login" });
  }
});

export const managerRouter = router;