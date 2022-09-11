const {MongoClient,ObjectId} = require('mongodb');
const connectionUrl = 'mongodb://localhost:27017';

// const id = new ObjectId();
// console.log(id);
// console.log(id.id.length);

// console.log(id.toHexString().length);

MongoClient.connect(connectionUrl,(err,client)=>{
    const db = client.db('task-manager');
    db.collection('users').findOne({name:'Sahruday'},(err,data)=>{
        // console.log(data);
    })

    db.collection('users').find({age: 26}).toArray((err,users)=>{
        // console.log(users);
    });

    db.collection('users').find({age: 26}).limit(2).toArray((err,data)=>{
        console.log(data);
    })
})