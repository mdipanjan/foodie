const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String
        
    },
    googleID:{
        type:String
    }

});

// mongoose.model = ('users', userSchema);


const User = mongoose.model('user', userSchema);
module.exports = User;