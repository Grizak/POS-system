const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Setup session
app.use(session({
    secret: 'FAJOPFÅISAH<ifhöiogpö<gudoihf<ios', // Change this to a random string
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
}));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes import
const posRoute = require('./routes/pos');
const itemRoutes = require('./routes/items');
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const POSTAuthRoutes = require('./routes/auth');
const GETAuthRoutes = require('./routes/auth2');

// EJS and Layouts setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Routes usage
app.use('/', indexRoutes);
app.use('/pos', posRoute);
app.use('/api/items', itemRoutes);
app.use('/api', apiRoutes);
app.use('/api/auth', POSTAuthRoutes);
app.use('/auth', GETAuthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
