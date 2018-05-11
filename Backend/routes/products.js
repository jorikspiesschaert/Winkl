const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const Store = require('../models/store');

router.post('/add', async (req, res, next) => {
    const category = await Category.findById(req.body.categoryID);
    const store = await Store.findById(req.body.store);
    let newProduct = new Product({
        name: req.body.name,
        category: category,
        store: store
    });

    Category.addProduct(category, newProduct);
    Product.addProduct(newProduct, (err, user) => {
        if(err){
            res.json({success: false, msg:err})
        }else{
            res.json({success: true, msg:'Succeed to reg product'})
        }
    });
});

router.post('/addStore', async (req, res, next) => {
    const product = await Product.findById(req.body.product);
    const store = await Store.findById(req.body.store);
    Product.addStore(product, store);
});

router.get('/:name/stores', async (req, res, next) => {
    const query = {name: req.params.name};
    await Product.findOne(query, (err, callback) => {
        if(callback){
        res.json(callback.stores)}
    }).populate('stores');

});

router.get('/', async (req, res, next) => {
    const products = await Product.find({}).populate('category');
    res.json(products);
});

module.exports = router;