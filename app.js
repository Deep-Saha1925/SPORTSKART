const express = require('express');
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose_connection');

//routers
const ownersRoute = require('./routes/ownersRoute');
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const indexRoute = require('./routes/index');
const expressSession = require('express-session');
const flash = require('connect-flash')

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', indexRoute);
app.use('/owners', ownersRoute);
app.use('/users', usersRoute);
app.use('/products', productsRoute);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});