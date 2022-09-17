require('../src/db/mongoose');
const Task = require('../src/models/task');

const deleteTaskAndCount = async (id)=>{
        await Task.findByIdAndDelete(id);
        return await Task.countDocuments({completed: false});
}

deleteTaskAndCount('631f6d13b381dff566814087')
        .then(console.log)
        .catch(console.log)