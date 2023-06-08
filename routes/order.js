var express = require('express');
var router = express.Router();
var connection = require('../connection');
var isLoggedIn = require('../isLoggedIn');



router.get('/', function(req, res, next) {
  if (req.session.isLoggedIn) {
    if(parseInt(req.session.total)>0){
        var total = req.session.total;
        res.render('shop/order', { title: 'Order Now', total: total });    
    }else{
        res.redirect('/cart');
    }
  }else {
    var message = 'you have to Log in to proceed to order';
    res.redirect('/sign?message=' + encodeURIComponent(message));

  }
});





router.post('/submit-order', async (req, res) => {
    const { fullName, address, phone } = req.body;
    if(req.session.cart.length>0){

      const firstEmployeeQuery = `
      SELECT id FROM employees WHERE id IS NOT NULL ORDER BY RAND() LIMIT 1;
    `;
    console.log(firstEmployeeQuery);


      const lastEmployeeQuery = `
        SELECT * FROM employees ORDER BY id DESC LIMIT 1;
      `;
      const leadQuery = `
      SELECT id FROM employees ORDER BY RAND() LIMIT 1;
      `;
  
      connection.query(lastEmployeeQuery, (error, employee, fields) => {
        if (error) throw error;

        connection.query(firstEmployeeQuery, (error, employee1, fields) => {
          if (error) throw error;

          connection.query(leadQuery, (error, lead, fields) => {
            if (error) throw error;

            next_employee_id = lead[0].id;
            console.log(next_employee_id);

            

            

            try {

              connection.query('INSERT INTO leads (user_id, full_name, address, phone_number, total, status, employee_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())', 
              [req.session.user.id, fullName, address, phone, req.session.total, 'pending', next_employee_id], (error, results, fields) => {
                if (error) throw error;
                for(let i=0; i<req.session.cart.length; i++){

                  connection.query('INSERT INTO lead_products (lead_id, product_id, quantity) VALUES (?, ?, ?)',
                  [results.insertId, req.session.cart[i].id, req.session.cart[i].quantity]), (error, results, fields) => {
                    if (error) throw error;
                  }
                }        
                  req.session.cart=[];
                  req.session.total=0;
                  return res.json({ message: 'your order was registered, you will receive a call in an instant' });
              });
                
              
            }catch (error) {
                console.error(error);
                res.status(500).send('Error registering user');
              }
          });
        });
      });
    }else{
        return res.json({ errorMessage: 'your order was registered, you will receive a call in an instant' });
    }
    
  });





module.exports = router;