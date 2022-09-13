require('../src/db/mongoose');
const express = require('express');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');


const app = express();
const port = process.env.PORT ||  3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log(`Server is up on ${port}`);
});


const bcrypt = require('bcryptjs');
const myFunction = async()=>{
    const password = "red2134!";
    const hashedPassword = await bcrypt.hash(password,8);

    const isMatch =  await bcrypt.compare('red2134!',hashedPassword);
    console.log(isMatch);
    console.log('hello');

    console.log(password,hashedPassword);
}

myFunction();