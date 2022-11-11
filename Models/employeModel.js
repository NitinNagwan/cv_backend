const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  employee = new Schema({
  // id: {
  //   type: Number,
  //   unique: true,
  //   required: true
  // },
  name:{
    type:String,
    require:true,                     
  },                       
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    default: null
  },
  employee_code: {
    type: String,
    required: true,
    unique: true
  },
  job_title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  // cv:{
  //   type: Object                     
  // }

},{timestamps: true});
module.exports = mongoose.model("Employee",employee);