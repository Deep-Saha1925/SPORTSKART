const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Users Route');
});


module.exports = app;