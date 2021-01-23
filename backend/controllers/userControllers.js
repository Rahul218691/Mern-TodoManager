const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const changePassword = asyncHandler(async(req,res) =>{
    const {password} = req.body;
    if(!password){
        res.status(400)
        throw new Error('Please enter the password')
    }
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400)
        throw new Error('User is Invalid')
    }
    user.password = password;
    await user.save();
    res.json({
        message:'User Password Updated Successfully'
    })
});

const getUserProfile = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400)
        throw new Error('User is Invalid')
    }
    res.json(user);
});


module.exports = {
    changePassword,
    getUserProfile
}