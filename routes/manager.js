import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import auth from '../middleware/auth.js';
import { getManagers, createManager, verifyManager } from "../helper.js";
import { createConnection } from "../createMongoConn.js";

const router = express.Router();

//Get Managers
router.get('/', auth, async function (request, response) {
    const client = await createConnection();
    const managers = await getManagers(client);
    response.send(managers);
})

//Manager Signup
router.post('/signup', auth,  async function (request, response) {
    const client = await createConnection();
    const { username, password } = request.body;
    console.log(username, password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //const hashPassword = await genPassword(password);
    console.log(username, password, salt, hashPassword);
    const result = await createManager(client, username, hashPassword);
    response.send(result);
})

//Manager Login
router.post('/login', auth, async function (request, response) {
    const client = await createConnection();
    const { username, password } = request.body;
    const result = await verifyManager(client, username);
    const storeDbpassword = result.password;
    //response.send(result);
    const isPasswordMatch = await bcrypt.compare(password, storeDbpassword)
    //response.send({ isPasswordMatch });

    if (isPasswordMatch) {
        const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY)
        response.send({ message: "Login Successful", token: token })
    } else {
        response.send({ message: "Invalid Login Credentials" })
    }
})

export const managerRouter = router;