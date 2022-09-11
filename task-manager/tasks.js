const {MongoClient,ObjectId} = require('mongodb');
const connectionUrl = 'mongodb://localhost:27017';

const id = new ObjectId();
console.log(id);
console.log(id.id.length);

console.log(id.toHexString().length);

MongoClient.connect(connectionUrl,(err,client)=>{
    const db = client.db('task-manager');
    db.collection('tasks').insertMany([
        {
            description: 'Buy milk from market',
            completed: false
        },{
            description: 'Send 150/- to Anish',
            completed: false
        }
    ], (err,result)=>{
        if(err){
            console.log('unable to insert tasks');
        }
        console.log(result.insertedIds);
    })
})