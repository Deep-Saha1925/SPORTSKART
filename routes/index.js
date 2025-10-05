const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const product_model = require('../models/product_model');
const user_model = require('../models/user_model');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render('index', { error, loggedin: false });
});

router.get('/shop', isLoggedIn, async (req, res) => {
    let products = await product_model.find();
    let success = req.flash("success");
    res.render('shop', {products, success});
});

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await user_model.findOne({email: req.user.email}).populate("cart");

    if (!user || !user.cart || user.cart.length === 0) {
            return res.render("cart", { user, bill: 0 }); // empty cart
    }
    
    res.render('cart', {user});
});

router.get('/addtocart/:productId', isLoggedIn, async (req, res) => {
    let user = await user_model.findOne({email: req.user.email});
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

module.exports = router;