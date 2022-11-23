const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
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
    cb(null, `${req.body.of_user}` + '.' + extension)
  },
});

var upload = multer({ storage: storage, limits: { fileSize: 3*1000*1000 } });




module.exports = upload;
