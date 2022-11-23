const multer = require("multer");

const store = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./assets");
    },
    filename: (req, file, cb) => {
      var extension = file.originalname.split('.')[1]
      // var filetype = "";
      // if (file.mimetype === "image/gif") {
      //   filetype = "gif";
      // }
      // if (file.mimetype === "image/png") {
      //   filetype = "png";
      // }
      // if (file.mimetype === "image/jpeg") {
      //   filetype = "jpg";
      // }
      cb(null, file.originalname)
    },
  });
  
  var upload_test = multer({ storage: store, limits: { fileSize: 1*1000*1000 } });

  module.exports = upload_test;