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
      ``;
    }
    cb(null, `${req.data.id}` + "." + filetype);
  },
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1000 * 1000 },
});

module.exports = upload;
