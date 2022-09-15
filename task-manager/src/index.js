require('../src/db/mongoose');
const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const jwt = require('jsonwebtoken');
require('../src/middleware/auth');

const maintainance = true;
const app = express();
const port = process.env.PORT ||  3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware:  ne

app.listen(port,()=>{
    console.log(`Server is up on ${port}`);
});
