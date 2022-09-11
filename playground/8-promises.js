const doWorCallback  = (callback)=>{
    setTimeout(()=>{
        // callback('This is my error!',undefined);
        callback(undefined,[1,3,4])
    },2000)
}

doWorCallback((error,result)=>{
    if(error){
        return console.log(error);
    }
    console.log(result);
})

const doWorkPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve([1,2,3]);
        reject('Things went wrong')
    },2000);
})

doWorkPromise.then((result)=>{
    console.log('Success!',result);
}).catch((err)=>{
    console.log('Error!',err);
})

