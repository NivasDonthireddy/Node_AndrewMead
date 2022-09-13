require('../src/db/mongoose');

const User = require('../src/models/user');

User.findByIdAndUpdate('631f6bc57f602dfe3224f7bf',{age: 1})
            .then(()=>User.countDocuments({age: 1}))
            .then((result)=>{
                console.log(result);})
            .catch((e)=>{
                console.log(e);
            });