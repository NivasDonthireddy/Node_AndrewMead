require('../src/db/mongoose');
const express = require('express');
const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT ||  3000;

app.use((req,res,next)=>{
    if(req.method === 'GET'){
        res.send('GET requests are disabled');
    }else {
        next();
    }
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// without middleware:  ne

app.listen(port,()=>{
    console.log(`Server is up on ${port}`);
});
