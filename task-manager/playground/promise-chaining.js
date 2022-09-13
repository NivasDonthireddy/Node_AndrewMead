require('../src/db/mongoose');

const { findByIdAndUpdate } = require('../src/models/user');
const User = require('../src/models/user');

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('631f621b152499361d9cd3a3',2)
    .then((result)=>console.log(result))
    .catch((err)=>console.log(err));