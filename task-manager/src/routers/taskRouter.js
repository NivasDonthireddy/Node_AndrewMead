const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.get('/tasks',auth,async (req,res)=>{
    try {
        const tasks = await Task.find({owner:req.user._id});
        res.send(tasks);
    }catch(e){
        res.status(500).send();
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).send();
        res.send(task);
    } catch(e){
        res.status(500).send();
    }
});

router.post('/tasks',auth,async (req,res)=>{
    const task = new Task(req.body);
    try {
        task.owner = req.user._id;
        await task.save();
        res.send(task);
    } catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!isValidOperation) res.status(404).send({err: 'Invalid update'});
    try {
        // const task = await Task.findById(req.params.id);
        const  task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        if(!task) return res.status(401).send('Unauthorized');
        updates.forEach((update) => task[update] = req.body[update]);
        if(!task) return res.status(404).send();

        await task.save();
        res.send(task);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})

router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        const  task = await Task.findOne({_id:req.params.id,owner:req.user._id});
        if(!task) return res.status(401).send('Unauthorized');
        await task.delete();
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;