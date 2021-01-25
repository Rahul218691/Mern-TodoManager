const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true		
	},
	password:{
		type:String,
		required:true
	},
	verification:{
		type:String
	},
	profile:{
		type:String,
		default:'https://res.cloudinary.com/rahulcloudstorage/image/upload/v1591775417/images_lg4hyi.png'
	},
},{
	timestamps:true
});



userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('user', userSchema)

module.exports = User;