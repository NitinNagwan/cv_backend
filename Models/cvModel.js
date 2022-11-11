const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CV = new Schema({
    of_user: {
        type: Schema.Types.ObjectId ,
        // type: String,
        required: true,
        // unique: true,
    },
    cv_details: Object

})


module.exports = mongoose.model('cv',CV)