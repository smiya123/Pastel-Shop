var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var connection = require('../connection');

const app= express();
/*
router.get('/', function(req, res, next) {
    res.render('shop/contact', { title: 'Contact' });
});
*/


//bodyparser middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//contact form nodemailer

router.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'az.ecom.app@gmail.com',
        pass: 'vgpzwienptwuvhpc'
      }
    });
  
    const mailOptions = {
      from: email,
      to: 'az.ecom.app@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.render('shop/contact')
      }
    });
  });
  
  //pour chabot
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
            title: 'Contact',
            allProductsJson: JSON.stringify(allProducts),
            allProducts: allProducts
          };
  
        res.render('shop/contact', data);
  
      });
      });


module.exports = router;
