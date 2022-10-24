const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const Filter = require('bad-words');
const {generateMessage,generateLocationMessage} = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));
let count = 0;

io.on('connection',(socket)=>{
    console.log('New Websocket Connection');
    socket.emit('message',generateMessage('Welcome!'));
    socket.broadcast.emit('message',generateMessage('A new user has joined!'));
    socket.on('sendMessage',(msg,callback)=>{
        const filter = new Filter();
        if(filter.isProfane(msg)){
            return callback('Profanity is not allowed');
        }
        io.emit('message',generateMessage(msg));
        callback();
    });

    socket.on('sendLocation',(data,callback)=>{
        io.emit('locationMessage',generateLocationMessage(`https://maps.google.com/?q=${data.latitude},${data.longitude}`));
        callback('Location shared!');
    })

    socket.on('disconnect',()=>{
        io.emit(generateMessage('message', 'A user has left'));
    });
});

server.listen(port,()=>{
    console.log('server listening at port 3000');
});