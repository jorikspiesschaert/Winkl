const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    stores: [{
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }]
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.addProduct = function(newProduct, callback){
    newProduct.save(callback);
}

module.exports.addStore = function(product, store, callback){
    product.stores.push(store);
    product.save();
}
