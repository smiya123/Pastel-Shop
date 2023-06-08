var express = require('express');
var router = express.Router();
var connection = require('../connection');


router.get('/', function(req, res, next) {
  const allProductsQuery = `
    SELECT * FROM products;
  `;

  connection.query(allProductsQuery, (error, allProducts, fields) => {
    if (error) {
      next(error);
      return;
    }

    res.render('shop/shop', {
      title: 'Shop',
      allProducts: allProducts
    });
  });
});

  

  

module.exports = router;