const express = require('express');
const  router = new express.Router();
const Task = require('../models/task');

router.get('/tasks',async (req,res)=>{
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(e){
        res.status(500).send();
    }
})

router.get('/tasks/:id',async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).send();
        res.send(task);
    } catch(e){
        res.status(500).send();
    }
});

router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body);
    console.log(task);
    try {
        await task.save();
        res.send(task);
    } catch(e){
        res.status(500).send(e);
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!isValidOperation) res.status(404).send({err: 'Invalid update'});
    try {
        const task = await Task.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).send('not found');
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;