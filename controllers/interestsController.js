const interests = require("../Models/interests");


const interestController = {
  async addInterest(req, res) {
    try {
      const { name, attachment } = req.body;
      const newinterest = new interests({
        name: name,
        image_url: attachment,
      });
      newinterest.save((err, success) => {
        if (err) {
          res.json({
            success: false,
            message: err.message,
            error: err,
          });
        } else {
          res.json({
            success: true,
            message: "Interest added successfully",
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

  editInterest(req, res) {
    try {
      const { id } = req.params;
      const { name, attachment } = req.body;

      const updatedInterest = {
        name: name,
        image_url: attachment,
      };

      interests.findByIdAndUpdate(id, updatedInterest, (err, success) => {
        if (err) {
          res.json({
            success: false,
            message: err.message,
            error: err,
          });
        } else {
          res.json({
            success: true,
            message: "Successfully updated Interest details",
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

  fetchInterest(req, res) {
    try {
      const { id } = req.params;

      interests.findById(id, (err, docs) => {
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
              message: "Interest does not exsist",
            });
          } else {
            res.json({
              success: true,
              message: "Successfully fetched Interest details",
              data: docs,
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

  async interestList(req,res){
    const {pageNumber,numberOfItems,searchKey} = req.body

    try{

      let limit = numberOfItems || 10
      var page = pageNumber || 1
      var searchObject
      
      if(searchKey){
        const regex = new RegExp(`${searchKey}`)
        searchObject = {
          name : regex,
        }
      }else{
        searchObject = {}
      }
    
      const Interests = await interests.find(searchObject).sort("_id")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

      const count = await interests.countDocuments();

      if(Interests.length == 0){
        res.json({
          success: false,
          message: "No data available"
        })
      }else{
        res.json({
          success: true,
          message: "Successfully fetched interests list",
          data: Interests,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        })
      }

    }catch(err){
      res.json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  }
};

module.exports = interestController;
