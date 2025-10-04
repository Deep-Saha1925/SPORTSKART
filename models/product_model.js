const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');
const { text } = require('stream/consumers');

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: String,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String
})

module.exports = mongoose.model('products', productSchema);