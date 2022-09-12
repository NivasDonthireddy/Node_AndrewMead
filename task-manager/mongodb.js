const {MongoClient,ObjectId} = require('mongodb');
const connectionUrl = 'mongodb://localhost:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionUrl,(err,client)=>{
    const db = client.db(dbName);
    db.collection('tasks').deleteOne({description:"Buy milk from market"})
        .then((result)=>console.log(result))
        .catch((err)=>console.log(err));
});
