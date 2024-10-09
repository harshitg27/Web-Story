const mongoose = require('mongoose');

const slidesSchema = new mongoose.Schema({
    heading :{
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes:[
        {
            type:mongoose.ObjectId,
            ref: "User"
        }
    ]
})

const storySchema = new mongoose.Schema({
    storyCategory:{
        type: String,
        required:true
    }, 
    userId:{
        type : mongoose.ObjectId,
        ref: "User"
    },
    slides : [
        {
            type: Object
        }
    ]

},
{timestamps:true})


module.exports = mongoose.model('Story' , storySchema) ;
