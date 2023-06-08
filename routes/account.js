var express = require('express');
var router = express.Router();
var connection = require('../connection');
const bcrypt = require('bcrypt');
var isLoggedIn = require('../isLoggedIn');


router.get('/', isLoggedIn, async (req, res) => {

  try {
    const query = `
      SELECT lp.product_id, lp.quantity, p.title, p.imagePath, p.id AS id, p.price, p.price*lp.quantity AS subtotal
      FROM leads l
      JOIN lead_products lp ON lp.lead_id = l.id
      JOIN products p ON p.id = lp.product_id
      WHERE l.user_id = ?
    `;
    const [rows, fields] = await connection.promise().query(query, [req.session.user.id]);
    console.log(rows);
    res.render('shop/account', { user: req.session.user, title: 'My orders', rows });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching favourites');
  }

});

router.get('/favs', isLoggedIn, async (req, res) => {
  try {
    const [rows, fields] = await connection.promise().query('SELECT product_id FROM favourite_products WHERE user_id = ?', [req.session.user.id]);

    const favs = [];
    for (let i = 0; i < rows.length; i++) {
      const [pros, fields] = await connection.promise().query('SELECT * FROM products WHERE id = ?', [rows[i].product_id]);
      favs.push(pros[0]);
    }

    res.render('shop/accountFav', { user: req.session.user, title: 'My favourites', favs: favs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching favourites');
  }
});



router.get('/settings', isLoggedIn, async (req, res) => {
  res.render('shop/accountSet', { user: req.session.user, title: 'Account settings'});
});



router.post('/update-info', async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
      if (error) throw error;

      if (results.length > 0) {
  
        res.status(400).json({ errorMessage: 'Email already registered, please use another one.' });
      } else {
    
        connection.query(`UPDATE users SET username = ?, email = ?, password = ?, updatedAt = NOW() WHERE id = ?`, [username, email, hashedPassword, req.session.user.id], (error, results, fields) => {
          if (error) throw error;
          req.session.user.username=username;
          req.session.user.email=email;
          res.json({ message: 'your information have been updated' });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: 'a problem occured, try again later' });
  }
});


router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
     console.log(err);
    } else {
     res.redirect('/sign');
    }
  });
});


//fav delete

router.get('/delete-fav/:productId', (req, res) => {
  const productId = req.params.productId;
  
  
  connection.query('DELETE FROM favourite_products WHERE user_id= ? AND product_id= ?', [req.session.user.id, productId], (error, results, fields) => {
    if (error) throw error;
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ success: true});
  }})
  
});









module.exports = router;

