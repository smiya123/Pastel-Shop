var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
    email: {type: String, required: true},
});


module.exports = mongoose.model('emailList', schema);