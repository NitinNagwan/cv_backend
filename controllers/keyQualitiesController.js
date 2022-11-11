const keyQualities = require("../Models/keyQualitiesModel");

const keyQualityController  = {
  async addQuality(req, res) {
    try {
      const { name } = req.body;
      const newQuality = new keyQualities({
        name: name,
      });
       newQuality.save((err, success) => {
        if (err) {
          res.json({
            success: false,
            message: err.message,
            error: err,
          });
        } else {
          res.json({
            success: true,
            message: "Key quality added successfully",
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

  editQuality(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedQuality = {
        name: name,
        // image_url: attachment,
      };

      keyQualities
        .findByIdAndUpdate(id, updatedQuality, (err, success) => {
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
                message: "Successfully updated key quality details",
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

  fetchQuality(req, res) {
    try {
      const { id } = req.params;

      keyQualities
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
                message: "Key quality does not exsist",
              });
            } else {
              res.json({
                success: true,
                message: "Successfully fetched key quality details",
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

  async qualityList(req, res) {
    const { pageNumber, numberOfItems, searchKey } = req.body;

    try {
      let limit = numberOfItems || 10;
      var page = pageNumber || 1;
      var searchObject;

      if (searchKey) {
        const regex = new RegExp(`${searchKey}`);
        searchObject = {
          name: regex,
          // email: regex,
        };
      } else {
        searchObject = {};
      }

      const quality = await keyQualities
        .find(searchObject)
        .sort("_id")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await keyQualities.countDocuments();

      if (quality.length == 0) {
        res.json({
          success: false,
          message: "No data available",
        });
      } else {
        res.json({
          success: true,
          message: "Successfully fetched key quality list",
          data: quality,
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

  deleteQuality(req, res) {
    try {
      const { id } = req.params;

      keyQualities
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
                message: "Key quality does not exsist",
              });
            } else {
              res.json({
                success: true,
                message: "Successfully deleted key quality details",
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

module.exports = keyQualityController ;
