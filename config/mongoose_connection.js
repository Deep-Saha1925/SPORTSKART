const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost:27017/sprtscart')
    .then(function(req, res){
        console.log("Database connected successfully");
    })
    .catch(function(err){
        console.log(err);
    });

module.exports = mongoose.connection;