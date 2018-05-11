const express = require('express');
const router = express.Router();
const Store = require('../models/store');

router.get('/', async (req, res, next) => {
    const stores = await Store.find({});
    res.json(stores);
});

router.post('/add', (req, res, next) => {
    let newStore = new Store({
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
        city: req.body.city,
        food: req.body.food,
        bancontact: req.body.bancontact,
        sunday: req.body.sunday
    });

    Store.addStore(newStore, (err, user) => {
        if(err){
            res.json({success: false, msg:err})
        }else{
            res.json({success: true, msg:'Succeed to reg cat'})
        }
    });
});

module.exports = router;