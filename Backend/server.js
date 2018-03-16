var express = require('express')
var cors = require('cors')
var app = express();

app.use(cors())

var products = [
    { name : "Monzarella", categorie : "Cheese"},
    { name : "Cola", categorie : "Soda"},
    { name : "Ice tea", categorie : "Soda"},
    { name : "Chips", categorie : "Snacks"}
]

app.get('/', (req, res) => {
    res.send('API van Winkl')
})

app.get('/stores', (req, res) => {
    res.send('API voor de stores')
})

app.get('/products', (req, res) => {
    res.send(products).json
})

app.get('/users', (req, res) => {
    res.send('API voor de users')
})

app.listen(3000)