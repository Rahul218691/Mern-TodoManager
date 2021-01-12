const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

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
        res.json({message:'Task created successfully'})
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
        res.json({message:'Task removed successfully'})
    }
})

module.exports = {
    createTask,
    getTasks,
    deleteTask
}