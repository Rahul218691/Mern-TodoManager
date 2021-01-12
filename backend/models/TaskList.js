const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const tasklistSchema = new mongoose.Schema({
    taskId:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:'user'
    },
    tasklists:[
        {
            task:String,
            completed:{
                type:Boolean,
                default:false
            },
            date:{
                type:Date,
                default:Date.now()
            }
        }
    ]
},{
    timestamps:true
});

const TaskList = mongoose.model('tasklist', tasklistSchema)

module.exports = TaskList;