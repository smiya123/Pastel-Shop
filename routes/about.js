var express = require('express');
var router = express.Router();
var connection = require('../connection');


router.get('/', function(req, res, next) {

    const allProductsQuery = `
      SELECT * FROM products ORDER BY id DESC Limit 5;
    `;

        connection.query(allProductsQuery, (error, allProducts, fields) => {
          if (error) {
            next(error);
            return;
          }
  
          const data = {
            title: 'About',
            allProductsJson: JSON.stringify(allProducts),
            allProducts: allProducts
          };
  
        res.render('shop/about', data);
  
      });
      });

  

module.exports = router;