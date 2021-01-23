const asyncHandler = require('express-async-handler');
const User = require('../models/User');



const sendVerifyEmail = asyncHandler(async(req,res) =>{
    const {email} = req.body;
    if(!email){
        res.status(400)
        throw new Error('Email is Required');
    }
    const verification = Math.floor(Math.random() * 100000000 + 1);
    const userExists = await User.findOne({email});
    if(!userExists){
        res.status(400)
        throw new Error('User with this email does not exists');
    }else{
        userExists.verification = verification;
        await userExists.save();
        const sendMail = require('../services/emailService');
        sendMail({
            from:process.env.NODEMAILER_USER,
            to:email,
            subject:'TaskPro Password Reset',
            text:'Please click on the link to reset your password',
            html:require('../services/emailTemplate')({
                verification:`http://localhost:3000/verification?verify=${verification}`
            })
        });
        res.json({message:'Email with reset link has been sent to the registered email'})
    }
});


const resetPassword = asyncHandler(async(req,res) =>{
    const {verification,password} = req.body;
    if(!verification || !password){
        res.status(400)
        throw new Error('All Fields Required');
    }
    const user = await User.findOne({verification});
    if(!user){
        res.status(400)
        throw new Error('User Invalid');
    }
    user.password = password;
    user.verification = "";
    await user.save();
    res.json({
        message:'Password reset successful Please Login to continue'
    })
})






module.exports = {
sendVerifyEmail,
resetPassword
}