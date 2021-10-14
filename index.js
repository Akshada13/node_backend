//Import packages, modules, scripts
import express from 'express';
import dotenv from "dotenv";
import { managerRouter } from './routes/manager.js';
import { userRouter } from './routes/user.js';

//Initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//converts body present in the request into json format
app.use(express.json());


app.get('/', function (request, response) {
    response.send('Welcome to Mern Backend - Dev Env !!!')
})

app.use("/managers", managerRouter);
app.use("/users", userRouter);

//call the connection function
app.listen(PORT, () => console.log("Express Server Listening on port: " + PORT));