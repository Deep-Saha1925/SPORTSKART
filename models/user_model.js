const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

monngoose.connect('mongodb://localhost:27017/sprtscart')

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String
})

module.exports = mongoose.model('users', userSchema);