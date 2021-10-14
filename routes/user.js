import express from 'express';import auth from '../middleware/auth.js';
import { createConnection } from "../createMongoConn.js";
import {
    getUserbyquery,
    createUser,
    deleteUser,
    updateUserbyid
} from "../helper.js"; //.. one level up & . current folder

//Create and export Router
const router = express.Router();
//1. import router
//2. use the router
//3. Export router & import in index.js and use via app.use
//4. Replace path


//1. get users
router.get('/', auth,  async function (request, response) {
    const { id, color, age } = request.params;
    console.log(request.query);
    const client = await createConnection();
    await getUserbyquery(client, id, response, color, age);
})

//2. create new uesr
router.post('/', auth, async function (request, response) {
    const client = await createConnection();
    const addUsers = request.body;
    console.log(addUsers);
    const user = await createUser(client, addUsers);
    console.log(addUsers, user)
    response.send(user);
})

//3. delete user
router.delete('/', auth,  async function (request, response) {
    const { id } = request.query;
    const client = await createConnection();
    const user = await deleteUser(client, id);
    console.log(request.query);
    response.send(user);
})

//4. update user
router.patch('/',auth, async function (request, response) {
    console.log(request.params);
    const { id } = request.query;
    const client = await createConnection();
    const newData = request.body;
    console.log(id, request.body);
    const user = await updateUserbyid(client, id, newData);
    //console.log(user);
    response.send(user);
})

export const userRouter = router;