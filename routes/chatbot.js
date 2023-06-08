var express = require('express');
var router = express.Router();
var connection = require('../connection');

router.get('/', function(req, res, next) {
  const allProductsQuery = `
    SELECT * FROM products ORDER BY id DESC Limit 10;
  `;

  connection.query(allProductsQuery, (error, allProducts, fields) => {
    if (error) {
      next(error);
      return;
    }

   res.render('shop/index', {
      title: 'index',
      allProductsJson: JSON.stringify(allProducts),
      allProducts: allProducts
    });
   
  });
});

module.exports = router;