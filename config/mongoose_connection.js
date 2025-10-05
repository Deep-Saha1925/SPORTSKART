const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();

const dbuger = require('debug')('development:mongoose');

mongoose
    .connect(`${config.get('MONGODB_URI')}/${config.get('DB_NAME')}`)
    .then(function(req, res){
        dbuger("Database connected successfully");
    })
    .catch(function(err){
        dbuger(err);
    });

module.exports = mongoose.connection;