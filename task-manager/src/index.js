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

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((err)=>{
        res.send(err);
    })
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id;
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send('Not Found');
        }
        res.send(user);
    }).catch((err)=>{
        res.send(err);
    })
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks);
    }).catch((err)=>{
        res.send(err);
    })
})

app.get('/tasks/:id',(req,res)=>{
    Task.findById(req.params.id).then((task)=>{
        if(!task){
            return res.status(400).send();
        }
        res.send(task);
    }).catch((err)=>{
        res.send(err);
    })
})

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body);
    task.save().then(()=>{
        res.send(task);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.listen(port,()=>{
    console.log(`Server is up on ${port}`);
});