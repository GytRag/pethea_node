const express = require('express');
const app = express();
const cors = require('cors');
const mainRouter = require('./router/routes');
const mongoose = require("mongoose");
require("dotenv").config();
const path = require('path');

mongoose
    .connect(process.env.MONGO_KEY)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error(err);
    })


app.use(cors({
    origin: '*', //'http://thecode.lt'
    credentials: true
}));
app.use(express.json());

// app.use('/api/pethea/', mainRouter)
app.use('/pethea/', mainRouter)

// Serve React App - Pethea (Frontend)
app.use('/pethea', express.static(path.join(__dirname, 'pethea/build')));
app.get('/pethea/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pethea/build', 'index.html'));
});


app.listen(3021);
console.log('Server started on port 3021');