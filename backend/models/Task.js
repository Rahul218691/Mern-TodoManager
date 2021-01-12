const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdBy:{
        type:ObjectId,
        ref:'user',
        required:true
    }
},{
    timestamps:true
});

const Task = mongoose.model('task', taskSchema)

module.exports = Task;