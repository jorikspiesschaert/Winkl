const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Store = require('../models/store');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to reg user'})
        }else{
            res.json({success: true, msg:'Succeed to reg user'})
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found'});
        } else {
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg:'Wrong password'});
            }
        });
    }
    });
});

router.post('/profile',  passport.authenticate('jwt', { session:false }), async (req, res, next) => {
    const user = await User.findById(req.body.user.id);
    res.json(user);
});

router.post('/isAdmin',  passport.authenticate('jwt', { session:false }), async (req, res, next) => {
    const user = await User.findById(req.body.user.id);
    console.log(user.isAdmin);
    res.json({"isAdmin" : user.isAdmin});
});

router.post('/getStores', async (req, res, next) => {
    const user = await User.findById(req.body.user.id);
    res.json(user.favoStores);
});

router.post('/addStore', async (req, res, next) => {

    const user = await User.findById(req.body.user.id);
    const query = {name: req.body.store.name};
    const store = await Store.findOne(query);
    User.addFavoStore(user, store);
});

router.post('/delStore', async (req, res, next) => {

    const user = await User.findById(req.body.user.id);
    const query = {name: req.body.store.name};
    const store = await Store.findOne(query);
    User.delFavoStore(user, store);
});

module.exports = router;