var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Estimation Project'
  });
});

/* People */
router.get('/getPeople', function(req, res) {
  var db = req.db;

  var collection = db.get('people');

  collection.find({},{},function(e,docs){
    res.send(docs);
  });
});

router.post('/deletePerson', function(req, res) {
  var db = req.db;

  var collection = db.get('people');

  collection.remove({ _id : req.body.id }, function(err, results) {
    res.send(!!err ? 'There was an error, ' + err : [200, results]);
  });
});

router.post('/addPerson', function(req, res) {

  var db = req.db;

  var person = req.body;

  var collection = db.get('people');

  collection.insert(req.body, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      res.send([200, "success"]);
    }
  });
});

/* Publications */
router.get('/getpublications', function(req, res) {
  var db = req.db;

  var collection = db.get('publications');

  collection.find({},{},function(err,docs) {
    res.send(docs);
  });
});

router.post('/getPublicationsForProfessor', function(req, res) {
  var db = req.db;

  var collection = db.get('publications');

  collection.find({
    authors : new RegExp('.*' + req.body.name + '.*')
  }, {

  },function(err, docs) {
    res.send(docs);
  });
});

router.post('/deletePublication', function(req, res) {
  var db = req.db;

  var collection = db.get('publications');

  collection.remove({ _id : req.body.id }, function(err, results) {
    res.send(!!err ? 'There was an error, ' + err : [200, results]);
  });
});

router.post('/addpublication', function(req, res) {
  var db = req.db;

  var collection = db.get('publications');

  collection.insert(req.body, function(err, doc) {
    res.send(!!err ? err : [200, "Success"]);
  });
});

module.exports = router;
