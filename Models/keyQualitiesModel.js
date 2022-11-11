const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keyQualities = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    }
    
},{timestamps: true})

module.exports = mongoose.model("keyQualities",keyQualities);