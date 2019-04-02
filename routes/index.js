var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/Menu');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  Type: String,
  Name: String,
  Description: String,
  Price: String,
  Contains: String,
  Image: String
});

var reviewsS = new Schema({
  Name: String,
  Date: String,
  Review: String
});

var UserData = mongoose.model('menuitems', userDataSchema);
var ReviewData = mongoose.model('reviews', reviewsS);

router.get('/', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('index', {title: "My Page", items: doc});

        console.log(doc);
      });
});
router.get('/booking', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('booking', {title: "My Page", items: doc});
        console.log(doc);
      });
});

router.get('/contactus', function(req, res, next) {
  res.render('contactus', {title: "My Page"});
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery', {title: "My Page"});
});

router.get('/story', function(req, res, next) {
  res.render('story', {title: "My Page"});
});

router.get('/reviews', function(req, res, next) {
  ReviewData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('reviews', {title: "My Page", items: doc});
        console.log(doc);
      });
});

router.get('/products', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        var starterList =[];
        var mainList =[];
        var desertList =[];
        var recList =[];
        for(var x = 0; x < doc.length; x++) {
          console.log("just here");
          console.log(doc[x].Type);
          console.log("im out");
          if(doc[x].Type === "Starter"){
            starterList.push(doc[x]);
          }
          if(doc[x].Type === "Main"){
            mainList.push(doc[x]);
          }
          if(doc[x].Type === "Desert"){
            desertList.push(doc[x]);
          }
          if(doc[x].Type === "Recomended"){
            recList.push(doc[x]);
          }
        }
        console.log(recList);
        res.render('products', {title: "My Page", starter: starterList, main:mainList, desert:desertList, recomended:recList});
      });
});
router.get('/test', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('testing', {title: "My Page", items: doc});
        console.log(doc);
      });
});
router.get('/add-to-cart/:id', function(req, res, next) {
  var productID = req.params.id;
  var shopingCart = new shopingCart(req.session.cart ? req.session.cart :{})

  Product.findByID(productId,function(err,product){
    if(err){
      return res.redirect('/');
    }
    shopingCart.add(product,product.id);
    req
  })
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next) {
  console.log("got here");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  console.log(today);
  var item = new ReviewData();
  item.Name= req.body.name;
  item.Date= today;
  item.Review= req.body.review;

  item.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
      console.error(error);
      res.status(500).send();
    }
    else {
      ReviewData.find()
          .then(function(doc) {
            console.log("Got as far as here, array length is: " + doc.length);
            res.render('reviews', {title: "My Page", items: doc});
            console.log(doc);
          });
    }
  });
});

module.exports = router;
