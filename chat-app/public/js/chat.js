const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

socket.on('locationMessage',(msg)=>{
    const html = Mustache.render(locationTemplate, {
        url: msg.url,
        createdAt: moment(msg.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html);
})

socket.on('message',(msg)=>{
    console.log(msg);
    const html = Mustache.render(messageTemplate, {
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html);
})
$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    $messageFormButton.setAttribute('disabled','disabled');
    const msg = e.target.elements.message.value;
    socket.emit('sendMessage',msg,(error)=>{
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error){
            return console.log(error)
        }
        console.log('Message Delivered');
    });
});

$sendLocationButton.addEventListener('click',()=>{
    $sendLocationButton.setAttribute('disabled','disabled');
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },(msg)=>{
            $sendLocationButton.removeAttribute('disabled');
            console.log(msg);
        });
    })
})