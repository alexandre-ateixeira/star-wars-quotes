const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var db;

MongoClient.connect('mongodb+srv://ateixeira:alex0202@alexandreateixeira-dccld.mongodb.net/test?retryWrites=true', (err, client) => {
    if (err) return console.log(err);
    db = client.db('star-wars-quotes');
    app.listen(3000, function() {
        console.log('listening on 3000');
    });
});



app.get('/', (req,res) => {
    var cursor = db.collection('quotes').find().toArray( (err, result) => {
        res.render('index.ejs', {quotes: result});
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.redirect('/')
    })
});