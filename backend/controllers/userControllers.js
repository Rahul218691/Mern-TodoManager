const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

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

const updateUserProfile = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user._id);
    if(!user){
        res.status(400)
        throw new Error('User Invalid')
    }
    if(!req.file){
        const username = req.body.name ? req.body.name : user.name;
        user.name = username;
        const updateduser = await user.save();
        res.json({
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email,
            token:generateToken(updateduser._id),
            profile:updateduser.profile
        });
    }else{
        const username = req.body.name ? req.body.name : user.name;
        const profileImg = `http://localhost:5000/profile/${req.file.filename}`;
        user.name = username;
        user.profile = profileImg;
        const updateduser = await user.save(); 
        res.json({
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email,
            token:generateToken(updateduser._id),
            profile:updateduser.profile
        });
    }
    
})


module.exports = {
    changePassword,
    updateUserProfile
}