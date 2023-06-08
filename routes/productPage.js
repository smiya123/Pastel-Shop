var express = require('express');
var router = express.Router();
var connection = require('../connection');



router.get('/:id', function(req, res, next) {
  const productId = req.params.id;
  const featuredProductsQuery = `
    SELECT * FROM products WHERE \`group\` = 'featuredProducts';
  `;
  const productQuery = `
    SELECT * FROM products WHERE id = ?;
  `;

  connection.query(featuredProductsQuery, (error, featuredProducts, fields) => {
    if (error) {
      next(error);
      return;
    }

    connection.query(productQuery, [productId], (error, product, fields) => {
      if (error) {
        next(error);
        return;
      }

      res.render('shop/productPage', {
        title: product[0].title,
        featuredProducts: featuredProducts,
        product: product[0]
      });
    });
  });
});



  

  module.exports = router;