var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/Menu');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  Type: String,
  Name: String,
  Discription: String,
  Image: String
});

var UserData = mongoose.model('menuitems', userDataSchema);

router.get('/', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('index', {title: "My Page", items: doc});
        console.log(doc);
      });
});
router.get('/products', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        console.log("Got as far as here, array length is: " + doc.length);
        res.render('products', {title: "My Page", items: doc});
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

module.exports = router;
