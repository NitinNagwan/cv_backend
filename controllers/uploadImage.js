require("dotenv").config();

const uploadImage = {
  image(req, res) {
    const { file } = req; 

    try {
      if (!file) {
        res.json({
          success: false,
          message: "Upload failed",
          url: "",
        });
      } else {

        const path = process.env.DOMAIN || "http://localhost:5000/"

        const image_url = path + req.file.filename;

        res.json({
          success: true,
          message: "Successfully uploaded image",
          url: image_url,
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

module.exports = uploadImage;
