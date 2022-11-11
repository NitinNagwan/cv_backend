const expertise = require("../Models/expertise");

const expertiseController = {
  async addExpertise(req, res) {
    try {
      const { name, attachment } = req.body;
      var Name = name.toUpperCase();
      const newExpertise = new expertise({
        name: Name,
        image_url: attachment,
      });
      newExpertise.save((err, success) => {
        if (err) {
          res.json({
            success: false,
            message: err.message,
            error: err,
          });
        } else {
          res.json({
            success: true,
            message: "Expertise added successfully",
          });
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

  editExpertise(req, res) {
    try {
      const { id } = req.params;
      const { name, attachment } = req.body;

      const updatedExpertise = {
        name: name,
        image_url: attachment,
      };

      expertise
        .findByIdAndUpdate(id, updatedExpertise, (err, success) => {
          if (err) {
            res.json({
              success: false,
              message: err.message,
              error: err,
            });
          } else {
            if (!success) {
              res.json({
                success: false,
                message: `No data exists with id ${id} `,
              });
            } else {
              res.json({
                success: true,
                message: "Successfully updated expertise details",
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

  fetchExpertise(req, res) {
    try {
      const { id } = req.params;

      expertise
        .findById(id, (err, docs) => {
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
                message: "Expertise does not exsist",
              });
            } else {
              res.json({
                success: true,
                message: "Successfully fetched expertise details",
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

  async expertiseList(req, res) {
    const { pageNumber, numberOfItems, searchKey } = req.body;

    try {
      let limit = numberOfItems || 10;
      var page = pageNumber || 1;
      var searchObject;

      if (searchKey) {
        const regex = new RegExp(`${searchKey.toUpperCase()}`);
        searchObject = {
          name: regex,
        };
      } else {
        searchObject = {};
      }

      const Expertise = await expertise
        .find(searchObject)
        .sort("_id")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await expertise.countDocuments();

      if (Expertise.length == 0) {
        res.json({
          success: false,
          message: "No data available",
        });
      } else {
        res.json({
          success: true,
          message: "Successfully fetched expertise list",
          data: Expertise,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          totalLength: count,
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

  deleteExpertise(req, res) {
    try {
      const { id } = req.params;

      expertise
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
                message: "Expertise does not exsist",
              });
            } else {
              res.json({
                success: true,
                message: "Successfully deleted expertise details",
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


};

module.exports = expertiseController;
