var express = require('express');
var router = express.Router();
var connection = require('../connection');


router.get('/', function(req, res, next) {
    var message = req.query.message;
    var total = req.session.total;
    var cart = req.session.cart;

    const allProductsQuery = `
      SELECT * FROM products ORDER BY id DESC Limit 5;
    `;

        connection.query(allProductsQuery, (error, allProducts, fields) => {
          if (error) {
            next(error);
            return;
          }
  
          const data = {
            title: 'Cart', 
            total: total, 
            cart:cart, 
            message: message,
            allProductsJson: JSON.stringify(allProducts),
            allProducts: allProducts
          };
  
        res.render('shop/cart', data);
});
});


router.get('/delete-cart/:productId', (req, res) => {
    const productId = req.params.productId;
    
    req.session.cart = req.session.cart.filter(product => product.id !== productId);
    total=0;

    var cart = req.session.cart;

    for(let i=0; i<cart.length; i++){
        total=total+cart[i].price*cart[i].quantity;
    }
    req.session.total = total;
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        res.json({ success: true, total: total });
    }
    
});

router.get('/minus-qty/:productId', (req, res) => {
    const productId = req.params.productId;
    
    var myprod = req.session.cart.find(item => item.id === productId);
    if (parseFloat(myprod.quantity) == 1) {
        return res.json({ errorMessage: 'minimum quantity is 1'});
    }else{
    myprod.quantity -= 1;
    myprod.totalPro = parseInt(myprod.quantity)*parseInt(myprod.price);

    total=0;

    var cart = req.session.cart;

    for(let i=0; i<cart.length; i++){
        total=total+cart[i].price*cart[i].quantity;
    }
    req.session.total = total;

    
        return res.json({ success: true, total: total, qty: myprod.quantity, sub: myprod.totalPro });
    }
    
    
});


router.get('/add-qty/:productId', (req, res) => {
    const productId = req.params.productId;
    
    var myprod = req.session.cart.find(item => item.id === productId);
    

    if(myprod.quantity==myprod.stock){

        return res.json({ errorMessage: 'the product available stock is '+ myprod.stock });
        
    }else{

        myprod.quantity = parseInt(myprod.quantity) + 1;
        myprod.totalPro = parseInt(myprod.quantity)*parseInt(myprod.price);

        total=0;

        var cart = req.session.cart;

        for(let i=0; i<cart.length; i++){
            total=total+cart[i].price*cart[i].quantity;
        }
        req.session.total = total;
        
        
        res.json({ success: true, total: total, qty: myprod.quantity, sub: myprod.totalPro });
        
    }
    
    
});


module.exports = router;


