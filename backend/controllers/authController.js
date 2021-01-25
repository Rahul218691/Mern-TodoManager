const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const createUser = asyncHandler(async(req,res) =>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all the fields')
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error('User with this Email Already exists!')
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        res.json({message:'User created successfully Please login to continue'})	 
    }else{
        res.status(400)
        throw new Error('Failed to Register User')
    }
});

const authUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('All fields are required');
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(400)
        throw new Error('User with this Email does not exists Please Register to continue');
    }
    let isMatch = await user.matchPassword(password);
    if(!isMatch){
        res.status(400)
        throw new Error('Email or Password does not Match!')
    }else{
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            profile:user.profile
        })
    }
})

module.exports = {
    createUser,
    authUser
}