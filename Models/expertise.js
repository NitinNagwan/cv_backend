
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Expertise = new Schema({
    image_url: {
        type: String,
        default: null
    },
    name: {
        type: String,
        require: true,
        unique: true
    }
    
},{timestamps: true})

module.exports = mongoose.model("expertise",Expertise);