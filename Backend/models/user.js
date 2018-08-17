const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Schema = mongoose.Schema;

//Schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    favoStores: [{
        type: Schema.Types.ObjectId,
        ref: 'favoStore'
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addFavoStore = function(user, store, callback){
    user.favoStores.push(store);
    user.save();
}

module.exports.delFavoStore = function(user, store, callback){
    user.favoStores.remove(store.id);
    user.save();
    console.log("gelukt");
}


module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){
                throw err
            }

            newUser.password = hash;
            newUser.save(callback());
        })
    }) 
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}