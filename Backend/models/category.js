const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.getCategoryById = function(id, callback){
    Category.findById(id, callback);
}

module.exports.getCategoryByName = function(name, callback){
    const query = {name: name};
    Category.findOne(query, callback);
}

module.exports.getProducts = function(id, callback){
    Category.findById(id, callback);
}

module.exports.addCategory = function(newCategory, callback){
    newCategory.save(callback);
}

module.exports.addProduct = function(category, product, callback){
    category.products.push(product);
    category.save(callback);
}
