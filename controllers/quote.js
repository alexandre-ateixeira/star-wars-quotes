const Quote = require('../models/Quote');

exports.index = (req,res) => {
    var query = Quote.find();
    query.exec( (err, result) => {
        res.render('index.ejs', {quotes: result});
    })
};

exports.save = (req, res) => {
    const q = new Quote({
        name: req.body.name,
        quote: req.body.quote
    });

    q.save( (err) => {
        if (err) console.error(err);
        console.log('saved database');
        res.redirect('/')
    });
    console.log(q);
};

exports.update = (req,res) => {
    Quote.findOneAndUpdate(
        {name: 'Yoda'},
        {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        },
        {
            sort: {_id: -1},
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result);
        }
    )
};

exports.delete = (req,res) => {
    Quote.findOneAndDelete(
        {name: req.body.name},
        (err, result) => {
            if (err) return res.send(500, err)
            res.send({message: 'A darth vadar quote got deleted'})
        }
    );
};