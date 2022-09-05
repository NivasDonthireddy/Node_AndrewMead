const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=ccacfbe9ccab701b5a005a57af3c405a&query=Hyderabad';
request({url: url,json:true},(error,response)=>{
    const data = response.body.current;
    console.log(`It is currently ${data.temperature} degrees out.
    There is a ${data.precip}% chance of rain`);
});

