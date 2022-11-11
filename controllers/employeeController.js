const employee = require("../Models/employeModel");

const employeeController = {
  addEmployee(req, res) {
    const {
      name,
      email,
      contact,
      employee_code,
      job_title,
      department,
      address,
    } = req.body;

    try {
      employee.findOne({ email: email }).exec(async (err, user) => {
        if (err) {
          res.json({
            success: false,
            message: "Something went wrong please try again",
          });
        } else {
          if (user) {
            res.json({
              success: false,
              message: `Employee with email ${email} already exsists `,
            });
          } else {
            const newEmployee = new employee({
              name: name,
              email: email,
              contact: contact,
              employee_code: employee_code,
              job_title: job_title,
              department: department,
              address: address,
            });

             newEmployee.save((err, success) => {
              if (err) {
                res.json({
                  success: false,
                  message: err.message,
                  error: err,
                });
              } else {
                res.json({
                  success: true,
                  message: "Employee added successfully",
                });
              }
            });
          }
        }
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  },

  async editEmployee(req, res) {
    const { id } = req.params;
    const {
      name,
      email,
      contact,
      employee_code,
      job_title,
      department,
      address,
    } = req.body;

    try {
      const updatedData = {
        name: name,
        email: email,
        contact: contact,
        employee_code: employee_code,
        job_title: job_title,
        department: department,
        address: address,
      };

      await employee
        .findByIdAndUpdate(id, updatedData, (err, employee) => {
          if (err) {
            res.json({
              success: false,
              message: err.message,
              error: err,
            });
          } else {
            if (!employee) {
              res.json({
                success: true,
                message: `No employee found with id ${id} `,
                data: employee,
              });
            } else {
              res.json({
                success: true,
                message: "Successfully updated employee details",
                data: employee,
              });
            }
          }
        })
        .clone();
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  },

  async deleteEmployee(req, res) {
    const { id } = req.body;
    try {
      await employee
        .findByIdAndDelete(id, (err, docs) => {
          if (err) {
            res.json({
              success: false,
              message: err.message,
              error: err,
            });
          } else {
            if (!docs) {
              res.json({
                success: false,
                message: "Employee does not exsist",
              });
            } else {
              res.json({
                success: true,
                message: "Scuccessfully deleted employee",
              });
            }
          }
        })
        .clone();
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  },

  async fetchEmployee(req, res) {
    const { id } = req.params;

    try {
      employee
        .findById(id, (err, docs) => {
          if (err) {
            res.json({
              success: false,
              message: "Something went wrong",
              error: err,
            });
          } else {
            if (!docs) {
              res.json({
                success: false,
                message: "Employee does not exsist",
              });
            } else {
              res.json({
                success: true,
                message: "Successfully fetched user details",
                data: docs,
              });
            }
          }
        })
        .clone();
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  },

  async employeeList(req, res) {
    const { pageNumber, numberOfItems, searchKey } = req.body;

    try {
      let limit = numberOfItems || 10;
      var page = pageNumber || 1;
      var searchObject;

      if (searchKey) {
        const regex = new RegExp(`.*${searchKey}.*`);
        searchObject = {
          $or: [
            { name: regex },
            { email: regex },
            { department: regex },
            { employee_code: regex },
          ],
        };
      } else {
        searchObject = {};
      }

      console.log(searchObject);

      const posts = await employee
        .find(searchObject)
        .sort("_id")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await employee.countDocuments();

      if (posts.length == 0) {
        res.json({
          success: false,
          message: "No data available",
        });
      } else {
        res.json({
          success: true,
          message: "Successfully fetched employee list",
          data: posts,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          TotalLength: count,
        });
      }
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  },
};

module.exports = employeeController;
