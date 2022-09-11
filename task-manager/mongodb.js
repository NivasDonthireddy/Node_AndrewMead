const {MongoClient,ObjectId} = require('mongodb');
const connectionUrl = 'mongodb://localhost:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionUrl,(err,client)=>{
    const db = client.db(dbName);
    const updatePromise = db.collection('users').updateOne({
        _id:new ObjectId("631db18acf5b5a37070fe2b6")
    },{
        $inc: {
            age:1
        }
    });

    updatePromise.then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })

});
