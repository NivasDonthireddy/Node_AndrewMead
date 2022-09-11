const {MongoClient,ObjectId} = require('mongodb');
const connectionUrl = 'mongodb://localhost:27017';

// const id = new ObjectId();
// console.log(id);
// console.log(id.id.length);

// console.log(id.toHexString().length);

MongoClient.connect(connectionUrl,(err,client)=>{
    const db = client.db('task-manager');

    db.collection('tasks').findOne({completed:false},(err,task)=>{
        console.log(task);
        console.log('---');
    })
    db.collection('tasks').find({completed: true}).toArray((err,tasks)=>{
        console.log(tasks);
    })
})