const mongoose = require('mongoose');
  
const imageSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = ImageModel = mongoose.model('Image', imageSchema);