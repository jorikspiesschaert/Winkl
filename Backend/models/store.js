const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const StoreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    food: {
        type: Boolean,
        required: true
    },
    bancontact: {
        type: Boolean,
        required: true
    },
    sunday: {
        type: Boolean,
        required: true
    }
    
});

const Store = module.exports = mongoose.model('Store', StoreSchema);


module.exports.addStore = function(newStore, callback){
    newStore.save(callback);
}