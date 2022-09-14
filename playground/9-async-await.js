const add = (a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },5000)
    })
}

const doWork = async ()=>{
    console.log('1');
    console.log(await add(1,99));
    const sum = await add(1,99);
    console.log('2')
    const sum2 = await add(sum,50);
    console.log('3')
    const sum3 = await add(sum2,3);
    console.log('4')
    console.log(await add(1,14));
    return sum3;
}

doWork().then((result)=>console.log(result))
        .catch((err)=>console.log(err))

