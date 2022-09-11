const {MongoClient,ObjectId} = require('mongodb');
const connectionUrl = 'mongodb://localhost:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionUrl,(err,client)=>{
    const db = client.db(dbName);
    db.collection('tasks').updateMany({completed: false},{
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
});
