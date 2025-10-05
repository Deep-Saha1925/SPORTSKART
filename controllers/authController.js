const userModel = require('../models/user_model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generate_token')

module.exports.registerUser =  async (req, res) => {
    try {
        let {email, fullname, password } = req.body;
        let user = await userModel.findOne({email: email})

        if(user){
            return res.status(401).send("Account already exists..");
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
                    res.send('User registered successfully');
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

    bcrypt.compare(password, user.password, (err, result) =>{
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.render("shop")
        }else{
            req.flash("error", "Email or password incorrect.");
            return res.redirect("/");
        }
    })
};

module.exports.logout = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}