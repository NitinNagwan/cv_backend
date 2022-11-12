const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Users = new Schema({
    name :{
        type: String,
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
    },
    token :{
        type: String,
        default: null
    }
})

module.exports = mongoose.model('users', Users)