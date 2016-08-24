var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;

  var collection = db.get('people');

  collection.find({},{},function(e,docs){
    res.render('index', {
      title: 'Express',
      "userlist" : docs
    });
  });

});

/* POST to Add User Service */
router.post('/addperson', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var name = req.body.name;
  var position = req.body.position;
  var publications = req.body.publications;

  // Set our collection
  var collection = db.get('people');

  // Submit to the DB
  collection.insert({
    "name" : name,
    "position" : position,
    "publications" : publications
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("");
    }
  });
});

module.exports = router;
