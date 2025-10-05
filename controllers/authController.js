const userModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generate_token');
const product_model = require('../models/product_model');
const session = require('express-session');
const flash = require('connect-flash');

module.exports.registerUser = async (req, res) => {
    try {
        let {email, fullname, password } = req.body;
        let user = await userModel.findOne({email: email})

        if(user){
            req.flash("error", "Account already exists..");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send('Error generating hash');
                else{
                    let user = await userModel.create({
                         email, fullname, password: hash
                    });
                    
                    let token = generateToken(user);
                    res.cookie('token', token);
                    req.flash("success", "User Registered Successfully, please Login.");
                    return res.redirect("/");
                }
            });
        });
     
    } catch (error) {
        console.log(error);
    }
};

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) {
        req.flash("error", "Email or password incorrect.");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, async (err, result) =>{
        if(result) {
            let token = generateToken(user);
            let products = await product_model.find();
            res.cookie("token", token);
            res.render("shop", {products});
        }else{
            req.flash("error", "Email or password incorrect.");
            return res.redirect("/");
        }
    });
};

module.exports.logout = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}