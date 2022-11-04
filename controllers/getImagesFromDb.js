const imageModel = require("../Models/userModels")

function getImages(req, res) {
    imageModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
};

module.exports = getImages;