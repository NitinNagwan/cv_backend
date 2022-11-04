const employeModel =require("../Models/employeModel")
async function updateEmployeeCv( req, res) {
    const {cv, _id} = req.body;
    
  try {
    if(!cv){
       throw new Error("cv not found")
    }
    const updatecv = await employeModel.findByIdAndUpdate(_id, {cv:cv},{new:true})
    res.status(200).json({message:"cv update successfully", data:updatecv,status:200})
  } catch (err) {
    res.status(404).json({message:err.message, status:404})
  }
  }
  module.exports = updateEmployeeCv;
  