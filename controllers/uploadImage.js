const imageModel = require("../Models/imageModel")
const fs = require('fs');
const path = require('path');

const multer = require('multer');
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });

const uploadImage = (upload.single('file'), (req, res) => {
  const saveImage = new imageModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png"
    }
  })
  saveImage.save().then(res => console.log("Image is saved", res)).catch(err => console.log("Error occured", err))
  res.send("Image Saved!!")
})

// function uploadImage(req, res, next) {
//   console.log({ req: req.body })
//     var obj = {
//         img: {
//             data: fs.readFileSync("uploads/" + req.body.filename),
//             contentType: 'image/png'
//         }
//     }
//     imageModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// };

module.exports = uploadImage;