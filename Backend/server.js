var express = require('express')
var cors = require('cors')
var app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('API van Winkl')
})

app.get('/stores', (req, res) => {
    res.send('API voor de stores')
})

app.get('/products', (req, res) => {
    res.send('API voor de products')
})

app.get('/users', (req, res) => {
    res.send('API voor de users')
})

app.listen(3000)