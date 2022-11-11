const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, `${req.body.id}` + "." + filetype);
  },
});

var upload = multer({ storage: storage, limits: { fileSize: 1*1000*1000 } });

// var uploadImage = upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//     } else if (err) {
//         // An unknown error occurred when uploading.
//     }
//     // Everything went fine. 
//     next()
// })

module.exports = upload;
