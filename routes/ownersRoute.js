const express = require('express');
const app = express();
const ownerModel = require('../models/owner_model');

app.get('/admin', (req, res) => {
    res.render("createproducts");
});

if(process.env.NODE_ENV === 'development'){
    app.post('/create', async (req, res) => {
        let owner = await ownerModel.find();
        if(owner.length) return res.status(503).send('You dont have permission to create more owners');
        
        let {fullname, email, password} = req.body;
        if(!fullname || !email || !password) return res.status(400).send('fullname, email and password are required');
        
        let createdUser = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdUser);
    });

}

module.exports = app;