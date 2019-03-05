const express = require('express');
const bodyParser= require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
//const MongoClient = require('mongodb').MongoClient
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');

dotenv.load({ path: '.env' });

const quoteController = require('./controllers/quote');


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
/*app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));*/
/*
var db;

MongoClient.connect('mongodb+srv://ateixeira:alex0202@alexandreateixeira-dccld.mongodb.net/test?retryWrites=true', (err, client) => {
    if (err) return console.log(err);
    db = client.db('star-wars-quotes');
    app.listen(3000, function() {
        console.log('listening on 3000');
    });
});
*/

app.get('/',quoteController.index);
app.post('/quotes',quoteController.save);
app.put('/quotes',quoteController.update);
app.delete('/quotes',quoteController.delete);

/*
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

app.put('/quotes', (req, res) => {
    db.collection('quotes').findOneAndUpdate({name: 'Yoda'}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    });
});

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'A darth vadar quote got deleted'})
    })
});
*/

app.listen(3000, () => {
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;