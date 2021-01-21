const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const TaskList = require('../models/TaskList');

const createTask = asyncHandler(async(req,res) =>{
    const {name} = req.body;
    if(!name){
        res.status(400);
        throw new Error('Please provide a task name')
    }
    const task = await Task.create({
        name,
        createdBy:req.user._id
    });
    if(task){
        res.json(task);
    }else{
        res.status(400)
        throw new Error('Failed to create a task')
    }
});

const getTasks = asyncHandler(async(req,res) =>{
    const tasks = await Task.find({createdBy:req.user._id});
    res.json(tasks);
});

const deleteTask = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    const task = Task.findOne({_id:id,createdBy:req.user._id});
    if(!task){
        res.status(400)
        throw new Error('Not allowed to perform this action')
    }else{
        await Task.findByIdAndDelete(id);
        await TaskList.findOneAndRemove({taskId:id});
        res.json({message:'Task removed successfully'})
    }
});

const addTaskList = asyncHandler(async(req,res) =>{
    const {taskId} = req.params;
    const {task,name} = req.body;
    
    if(!task){
        res.status(400)
        throw new Error('Please create a task');
    }

    const Exist = await TaskList.findOne({taskId});
    // console.log(Exist)

    if(!Exist){
        const newTask = new TaskList({
            taskId,
            taskName:name,
            user:req.user._id,
            tasklists:[
                {
                    task
                }
            ]
        });
    
        const createTaskList = await newTask.save();
        res.status(201).json(createTaskList)
    }else{
        const taskupdate = await TaskList.findOneAndUpdate({taskId},{
            $push:{
                tasklists:{
                    task
                }
            }
        },{
            new:true
        })
        res.json(taskupdate);
    }
    
});

const getTaskById = asyncHandler(async(req,res) =>{
    const {taskId} = req.params;
    const TaskSubTask = await TaskList.find({taskId});
    res.json(TaskSubTask);
})

const deleteSubTask = asyncHandler(async(req,res) =>{
    const {taskId,tasklistId} = req.params;
    const TaskExist = await TaskList.findOne({taskId});
    // console.log(TaskExist)
    if(!TaskExist){
        res.status(400)
        throw new Error('Task not found');
    }else{
        const pullRecord = await TaskList.findOneAndUpdate({taskId},{
            $pull:{
                tasklists:{
                    _id:tasklistId
                }
            }
        },{
            new:true
        });
        res.json(pullRecord)
    }
});

const addTaskCompleted = asyncHandler(async(req,res) =>{
    const {taskId,tasklistId} = req.params;
    const TaskExist = await TaskList.findOne({taskId});
    if(!TaskExist){
        res.status(400)
        throw new Error('Task not found');
    }else{
        const patchRec = await TaskList.findOne({taskId});
        const getid = patchRec.tasklists;
        for(var i = 0; i< getid.length; i++) {
            if(getid[i]._id == tasklistId){
                 getid[i].completed = true;
                 await patchRec.save();
            }
        }
        res.send({})
    }
})

module.exports = {
    createTask,
    getTasks,
    deleteTask,
    addTaskList,
    getTaskById,
    deleteSubTask,
    addTaskCompleted
}