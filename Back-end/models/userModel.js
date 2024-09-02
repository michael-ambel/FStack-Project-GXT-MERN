const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique:true
    },
    password : {
        type: String,
        required: true
    }
}, {timestamps: true})

//static signup method
userSchema.statics.signup = async function(email, password) {

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }
    if(!validator.isLength(password, {min: 4, max: 20})){
        throw Error('Password min 4 & max 20 character')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Weak password')
    }

    const emailExist = await this.findOne({email}) 

    if(emailExist){
        throw Error ('This email is registerd')
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hashed})

    return user
}

//static login method
userSchema.statics.login = async function(email, password){

    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(!validator.isLength(password, {min: 4, max: 20})){
        throw Error('Password min 4 & max 20 character')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('This email is not registerd')
    }

    const checkPass = await bcrypt.compare(password, user.password)
    if(!checkPass){
        throw Error('The password is incorrect')
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);