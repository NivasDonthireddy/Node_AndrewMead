require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('631f80c1f4ede18a2e47753d')
        .then(()=>Task.countDocuments({completed: false}))
        .then((result)=>console.log(result))
        .catch((err)=>console.log(err));