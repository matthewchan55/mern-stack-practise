const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

//Define the property on each workout document
//when created, timestamp automatically generate
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        //required: true
    },
    phoneNum: {
        type: String, 
        //required: true
    },
    sex: {
        type: String, 
        //required: true
    },
    HKID: {
        type: String, 
        //required: true
    },
    staffID: {
        type: String, 
        //required: true
    }
})

// static signup method 
userSchema.statics.signup = async function (email, password) {

    // Validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email not valid')
    }

    // usually User.findOne..., but not declared, simply use this.findOne
    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    // Hashing (mern authentication #3)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, address: '', phoneNum:'', sex: '', staffID:'', HKID:''})

    return user
}


// static login method
userSchema.statics.login = async function(email, password) {
    // Validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Invalid email or password')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Invalid email or password')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)



