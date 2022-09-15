const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    email: {
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// defining the custom method.
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('Unable to login');
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

// public profile
userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// generating auth tokens
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},'secret',{expiresIn: '1 day'});
    
    user.tokens = user.tokens.concat({token});
    await user.save();
    
    return token;
}

// Hash the plain text password before saving.
userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
        console.log(user.password);
    }
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;