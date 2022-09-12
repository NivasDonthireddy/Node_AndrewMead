const mongoose = require('mongoose');
const User = mongoose.model('User',{
    name:  {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('cannot contain password key');
            }
        },
    },
    age: {
        type: Number
    }
})

module.exports = User;