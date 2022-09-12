const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User',{
    name:  {
        type: String,
        required: true
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

const me = new User({
    name: 'Andrew',
    password: '     N1v@sr3ddy    ',
    age: 26
})

me.save().then(()=>{
    console.log(me);
}).catch((err)=>{
    console.log(err);
})