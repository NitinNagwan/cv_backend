// ref: refs/remotes/origin/main
const employeModel =require("../Models/employeModel")
async function employeDetails( req, res) {
    const data = req.body;
  try {
    const reg = new employeModel({
      emp:data.emp,
      name: data.name,
      email: data.email,
      designation :data.designation,
      cv: data.cv
    });
    await reg.save();
    res.send("user Added")
  } catch (err) {
    res.send(err);
  }
  }
  module.exports = employeDetails;
  