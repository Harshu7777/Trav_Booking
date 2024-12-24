const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true ," Name is Required"]
    },
    email:{
        type : String,
        required : [true ," Email is Required"]
    },
    password : {
        type : String,
        required : [true ," Password is Required"]
    },
    role: {
        type: String,
        enum: ['admin' , 'user'],
        default: 'user'
    }

}, {
    timestamps : true
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin