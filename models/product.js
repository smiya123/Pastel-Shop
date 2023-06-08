var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    image1: {type: String, required: true},
    image2: {type: String, required: true},
    image3: {type: String, required: true},
    description: {type: String, required: true},
    group: {type: String, required: true},
    imagePath: {type: String, required: true},
    brand: {type: String, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true}
});


module.exports = mongoose.model('product', schema);