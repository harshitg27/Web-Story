const mongoose  = require('mongoose')
const {Schema} = require('mongoose')
// schema of users(name , email  , password)
const userSchema = new Schema({
    userName: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required:true
    },
    bookmarks:[
        {}
    ],
    likes:[

    ]
},
{timestamps:true})

module.exports = mongoose.model('User' , userSchema) ;