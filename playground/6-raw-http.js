const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=ccacfbe9ccab701b5a005a57af3c405a&query=Hyderabad`;

const request = http.request(url,(response)=>{
    let data = '';
    response.on('data',(chunk)=>{
        data = data + chunk.toString();
    })

    response.on('end',()=>{
        const body = JSON.parse(data);
        console.log(body);
    })
});

request.on('error',(error)=>{
    console.log('An error',error);
})
request.end();
