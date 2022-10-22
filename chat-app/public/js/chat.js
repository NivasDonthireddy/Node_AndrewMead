const socket = io();
socket.on('countUpdated',(count)=>{
    console.log('The Count has been updated to: ',count);
})
document.querySelector('#increment').addEventListener('click',()=>{
    socket.emit('increment');
})
