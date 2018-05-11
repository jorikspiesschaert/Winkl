const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.post('/add', (req, res, next) => {
    let newCategory = new Category({
        name: req.body.name
    });

    Category.addCategory(newCategory, (err, user) => {
        if(err){
            res.json({success: false, msg:err})
        }else{
            res.json({success: true, msg:'Succeed to reg cat'})
        }
    });
});

router.post('/:categoryID', (req, res, next) => {
    const category = Category.findById(req.param('categoryID'))
});

router.get('/', async (req, res, next) => {
    const categories = await Category.find({}).populate('products');
    res.json(categories);
});

router.get('/:categoryID/products', (req, res, next) => {
    const category = Category.getCategoryByName(req.param('name'));
});

module.exports = router;