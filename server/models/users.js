
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId:{
        type:String
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    photo:{
        type:String
    },
    email:{
        type:String,
        required:true
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users
};