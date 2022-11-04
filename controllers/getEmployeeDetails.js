const employeModel = require("../Models/employeModel")
function getEmployeeDetails(req, res) {
    console.log("hi");
    employeModel.find({}, (err, data) => { 
        
        if(data)
        res.send(data) 
        
        if(err)
        res.send("err while fetching table")
    })

}
module.exports = getEmployeeDetails;