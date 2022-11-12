const CV = require("../Models/cvModel");

const createCvController = {
  addCv(req, res) {
    const { of_user, cv } = req.body;
    try {
      CV.findOne({ of_user: of_user }).exec(async (err, success) => {
        if (err) {
          res.json({
            success: false,
            message: "",
            error: err,
          });
        } else {
          if (success) {
            res.json({
              success: false,
              message: "Cv for the employee already exists",
              data: success,
            });
          } else {
            const newCv = new CV({
              of_user: of_user,
              cv_details: cv,
            });

             newCv.save((err, success) => {
              if (err) {
                res.json({
                  success: false,
                  message: "CV already exsists",
                  error: err.message,
                });
              } else {
                res.json({
                  success: true,
                  message: "Cv created successfully",
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

  editCv(req, res) {

    const { id } = req.params;
    const { cv } = req.body;

    const updatedData = {
      cv_details: cv,
    };
    try {
      CV.findOneAndUpdate({ of_user: id }, updatedData, (err, success) => {
        if (err) {
          res.json({
            success: false,
            messgae: "Unable to update cv details",
            error: err,
          });
        } else {
          if (!success) {
            res.json({
              success: false,
              message: `No cv details exsists for employee with  id ${id}`,
              data: success,
            });
          } else {
            res.json({
              success: true,
              message: "Successfully updated cv details",
            });
          }
        }
      }).clone();
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  },
};

module.exports = createCvController;
