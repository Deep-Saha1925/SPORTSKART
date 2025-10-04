const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Owners Route');
});


module.exports = app;