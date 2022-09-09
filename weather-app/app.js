const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const location = process.argv[2]
if(location){
    geoCode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return console.log(error);
        }
    
        forecast(latitude,longitude,(err,resp)=>{       
            if(error){
                return console.log(error);
            }
            console.log(location);
            console.log(resp);
        })
    })
}
else {
    console.log('please provide the location');
}
