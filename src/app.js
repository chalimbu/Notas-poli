//first the core afther npm, after users utils
const path = require('path')
const express = require('express')



const app = express()
const port = process.env.PORT || 3000

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

//paths to express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))
app.use(express.json());

app.post('/login', function(req, res) {
    console.log(req.body); // your JSON
    return res.send(req.body)
});

app.listen(3000);