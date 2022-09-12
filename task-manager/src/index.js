const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT ||  3000;

mongoose.connect('mongodb://localhost:27017/task-manager-api');

app.use(express.json());

app.post('/users',(req,res)=>{
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((err)=>{
        res.status(400).send(err);        
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body);
    task.save().then(()=>{
        res.send(task);
    }).catch((err)=>{
        res.send(err).status(400);
    })
})

app.listen(port,()=>{
    console.log(`Server is up on ${port}`);
});