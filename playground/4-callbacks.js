// const geoCode = (address,callback)=>{
//     setTimeout(()=>{
//         const data = {
//             longitude: 0,
//             latitude: 0
//         }
//         return data;
//     },1000)
// }

// const data = geoCode('hyd');
// console.log(data);

const add = (x,y,callback)=>{
    setTimeout(()=>{
        callback(x+y)
    },2000)
}

add(1,4,(sum)=>{
    console.log(sum);
})