var express = require('express');
var router = express.Router();
var path = require('path');
var getRandomNumber = require('./getRandomNumber');

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/week10assessmentdatabase';
}

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connectionString, function (err,client, done){
        var query = client.query ('SELECT * FROM animals;');

        query.on('row', function (row){
            results.push(row);
        });

        query.on ('end', function () {
            client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});

router.post('/', function(req, res) {

    pg.connect(connectionString, function(err, client, done){
        client.query('INSERT INTO animals (animal_name, animal_Number) VALUES($1, $2)',
            [req.body.newAnimal, getRandomNumber(1,100)],
            function (err, result) {
                if (err){
                    console.log('error inserting data: ' , err );
                    res.send (false);
                } else {
                    res.send(result);
                }
            });
    });

});

module.exports = router;