const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const products = require('./routes/products');
const stores = require('./routes/stores');
const categories = require('./routes/categories');
const config = require("./config/database");

app.use(cors());

//voor public html: https://www.youtube.com/watch?v=DQ9pZ2NKXRo 10:35
app.use(bodyParser.json());
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.database).then(
  ()=>{
    console.log("Connected to mongoDB")},
 (err)=>{
     console.log("err",err);
});

app.use('/users', users);
app.use('/categories', categories);
app.use('/products', products);
app.use('/stores', stores);

app.get('/', (req, res) => {
    res.send('API van Winkl')
})

app.listen(3000)