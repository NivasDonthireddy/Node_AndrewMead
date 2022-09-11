// CRUD create read update & delete.

const mongodb = require('mongodb');
const MongoClient =  mongodb.MongoClient;

const connectionUrl = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl,{useNewUrlParser: true},(err,client)=>{
    if(err){
        return console.log('Unable to connect to database!');
    }

    const db  = client.db(databaseName);

    // insertOne is async
    db.collection('users').insertOne({
        name: 'Nivas',
        age: 26
    },(error,result)=>{
        if(error){
            return console.log('unable to insert user');
        }

        console.log(result);
    })

    db.collection('users').insertMany([{
        name: 'Savin',
        age: 23
    },
    {
        name: 'Ganther',
        age: 17
    }],(err,result)=>{
        if(err){
            return console.log('unable to insert docs')
        }
        console.log(result.insertedIds);
    })
});