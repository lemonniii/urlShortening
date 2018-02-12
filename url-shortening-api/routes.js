var express = require('express');
var device = require('express-device');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/url-shortening');
var uuidv4 = require('uuid/v4');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(device.capture());

var Url = require('./model/url');
var Visitor = require('./model/visitor');

/********************** Router ***********************/

router.use(function timeLog (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

/******************** Global Functions *********************/

var uuidGen = () => {
  return uuidv4().substring(0,6);
}

var count = uuidGen();
var domain = "http://localhost:3004/short/"

var shorten = (longUrl) => {
  var short = domain + count;
  count = uuidGen();
  return short;
}

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

/******************** lookup URL *********************/

router.get('/long/*', function(req, res) {
  Url.findOne({'longUrl': req.params[0]}).exec(function(err, url) {
    if (err) {
        res.status(500).send({error: "didnt work"});
    } else {
      if (isEmptyObject(url)) {
        var url = new Url();
        url.longUrl = req.params[0];
        url.shortUrl = shorten(url.longUrl);
        url.save(function(err, savedUrl) {
          if (err) {
            res.status(500).send({error: "Could not save Url"});
          } else {
            res.send(savedUrl);
          }
        });
      } else {
        res.send(url);
      }
    }
  });
});

/*********************** Visitors ********************/

router.get('/short/:id', function(req, res) {
  var shortUrl = domain + req.params.id;

  Url.findOne({'shortUrl': shortUrl}).populate({path:'visitors', model: 'Visitor'}).exec(function(err, urlVisit) {
    if (err) {
      res.status(500).send({error: "Could not find URL"});
    } else {
      res.send(urlVisit);
    }
  });

});

router.post('/short/:id', function(req, res) {
  var visitor = new Visitor();
  visitor.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddressb.split(",")[0];
  visitor.timestamp = new Date().toISOString();
  visitor.deviceType = req.device.type;
  var shortUrl = domain + req.params.id;

  Url.findOne({'shortUrl': shortUrl}, function(err, curUrl) {
    if (err) {
      res.status(500).send({error: "Could not find URL"});
    } else {
      Url.update({'shortUrl': shortUrl}, {$inc: {numVisits: 1}, $addToSet: {visitors: visitor._id}}, function(err, url) {
        if (err) {
          res.status(500).send({error: "Could not add visitor"});
        } else {
          visitor.save(function(err, newVisitor) {
            if (err) {
              res.status(500).send({error: "Could not document visitor"});
            } else {
              res.send(newVisitor);
            }
          });
        }
      });
    }
  });

});

/**************** Increase */

/*********************** Exports *********************/

module.exports = router;
