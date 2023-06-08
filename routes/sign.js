var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../connection');


router.get('/', function(req, res, next) {
  var message = req.query.message;
  res.render('shop/sign', { title: 'Register & Login', message: message });
});


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
      if (error) throw error;

      if (results.length > 0) {
  
        res.status(400).json({ errorMessage: 'Email already registered, please use another one.' });
      } else {
        connection.query('INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())', [username, email, hashedPassword], (error, results, fields) => {
          if (error) throw error;

          res.json({ message: 'You have been registered successfully, please login. ' });
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});






router.post('/login', async (req, res) => {
  const { emailLogin, passLogin } = req.body;

  try {
    connection.query('SELECT * FROM users WHERE email = ?', [emailLogin], async (error, results, fields) => {
      if (error) {
        throw error;
      }

      const user = results[0];

      if (!user) {
        return res.status(400).json({ errorMessage: 'The email is incorrect.' });
      }

      const isPasswordMatch = await bcrypt.compare(passLogin, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ errorMessage: 'The password is incorrect.' });
      }

      req.session.isLoggedIn = true;
      req.session.user = user;

      if(req.session.cart){
        res.json({ Message1: 'You are logged in, you can continue your purchase' });
      }else{
        res.status(400).json({ Message: true });
      }

      
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user');
  }
});





module.exports = router;