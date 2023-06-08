var express = require('express');
var router = express.Router();
var connection = require('../connection');
const bodyParser = require('body-parser');




router.get('/', function(req, res, next) {
  const featuredProductsQuery = `
    SELECT * FROM products WHERE \`group\` = 'featuredProducts';
  `;
  const newArrivalsQuery = `
    SELECT * FROM products WHERE \`group\` = 'newArrivals';
  `;
  const allProductsQuery = `
    SELECT * FROM products ORDER BY id DESC Limit 5;
  `;

  connection.query(featuredProductsQuery, (error, featuredProducts, fields) => {
    if (error) {
      next(error);
      return;
    }

    connection.query(newArrivalsQuery, (error, newArrivals, fields) => {
      if (error) {
        next(error);
        return;
      }
      connection.query(allProductsQuery, (error, allProducts, fields) => {
        if (error) {
          next(error);
          return;
        }

        const data = {
          title: 'PASTEL home',
          featuredProducts: featuredProducts,
          newArrivals: newArrivals,
          allProductsJson: JSON.stringify(allProducts),
          allProducts: allProducts
        };

      res.render('shop/index', data);

    });
    });
  });
});







//newsletter handling

router.post('/newsletter', (req, res) => {

  const email = req.body.email;

  connection.query('SELECT * FROM emailLists WHERE email = ?', [email], (error, results, fields) => {
    if (error) throw error;

    if (results.length > 0) {

      res.status(400).json({ errorMessage: 'Email already registered.' });
    } else {
      connection.query('INSERT INTO emailLists (email, createdAt, updatedAt) VALUES (?, NOW(), NOW())', [email], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting email into database.');
        } else {
          console.log('Email inserted successfully.');
          res.status(200).json({ message: 'Email submitted successfully' });
        }
      });
    }
  });
});



//bodyparser middlewear
const app= express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function isProductInCart(cart, id){
  for(let i=0; i<cart.length; i++){
    if(cart[i].id==id){ return true;
    }
  }
  return false;
}



router.post('/add-to-cart', (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var image = req.body.image;
  var price = req.body.price;
  var stock = req.body.stock;
  var quantity = req.body.quantity;
  var totalPro = price * quantity;
  var product = {id:id, title:title, image:image, price:price, quantity:quantity, totalPro:totalPro, stock: stock};

  if(stock==0){
    return res.json({ errorMessage: 'This product is out of stock' });
  }

  if(req.session.cart){
    var cart = req.session.cart;

    if(isProductInCart(cart, id)){
      for(let i=0; i<cart.length; i++){
        if(cart[i].id==id){ 
          var testQty=parseFloat(cart[i].quantity)+parseFloat(quantity);
          if(parseFloat(testQty)>parseFloat(stock)){
            return res.json({ errorMessage: 'Available stock for this product is '+ stock});
          }else{
          cart[i].quantity=parseFloat(cart[i].quantity)+parseFloat(quantity);
          cart[i].totalPro=cart[i].quantity*price;
          }
        }
      }
      total=0;

      for(let i=0; i<cart.length; i++){
        total=total+cart[i].price*cart[i].quantity;
        req.session.total = total;
      }
      req.session.total = total;
      return res.json({ message: 'Quantity added to product in cart' });
    }

    if(!isProductInCart(cart, id)){
          if(parseFloat(quantity)>parseFloat(stock)){
            return res.json({ errorMessage: 'Available stock for this product is '+ stock});
          }else{
            cart.push(product);
          }
    }
  }else{
    if(parseFloat(quantity)>parseFloat(stock)){
      return res.json({ errorMessage: 'Available stock for this product is '+ stock});
    }else{
      req.session.cart= [product];
      var cart = req.session.cart;
    }
  }

  total=0;

  for(let i=0; i<cart.length; i++){
    total=total+cart[i].price*cart[i].quantity;
  }
  req.session.total = total;

  res.json({ message: 'Product Successfully addded to cart' });

  

});





router.post('/add-to-fav', (req, res) => {
  

  if(!req.session.isLoggedIn){
    return res.json({ errorMessage: 'you must Log in to use this feature' });
  }else{
    var user = req.session.user;
    var productId = req.body.proid;
    var userId = user.id;
    connection.query('SELECT * FROM favourite_products WHERE user_id = ? AND product_id = ?', [userId, productId], (error, results, fields) => {
      if (error) throw error;

      if (results.length > 0) {

        res.status(400).json({ errorMessage: 'product already in favourites' });
      } else{
        if(req.session.isLoggedIn){
          connection.query('INSERT INTO favourite_products (user_id, product_id, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())', [userId, productId], (error, results, fields) => {
            if (error) throw error;

            return res.json({ message: 'product successfully added to favourites' });
          });
        }
      }
    })
  }
});



//envoie d'email
const nodemailer = require('nodemailer');

router.post('/send-message', (req, res) => {
  const { email, message } = req.body;

  const randEmployee = `
      SELECT id FROM employees WHERE id IS NOT NULL ORDER BY RAND() LIMIT 1;
      `;
    console.log(randEmployee);

    connection.query(randEmployee, (error, lead, fields) => {
      rand_employee_id = lead[0].id;
   

      connection.query('INSERT INTO `issues`( `email`, `issue`, `employee_id`) VALUES (?,?,?)',([email,message,rand_employee_id]),()=>{});

   });
  const emailSource= email;
  // Configuration du service d'envoi d'e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'chatbotpastel@gmail.com',
      pass: 'sffocmhlwsmvquty'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Options de l'e-mail
  const mailOptions = {
    from: email,
    to: 'letexte2001@gmail.com',
    subject: 'New message from chatbot',
    html: "<h3>Message via <i> ChatBot </i> de la part de : " + emailSource + "</h3>" + message.replace(/\n/g, "<br>")
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
     // res.render('shop/index', { errorMessage: 'Une erreur s\'est produite lors de l\'envoi du message.' });
    } else {
     // res.render('shop/index', { successMessage: 'Le message a été envoyé avec succès.' });
    }
  });
});

// enregistrer l'e-mail dans newsletter
router.use(bodyParser.json());

router.use(express.json());

router.post('/email', (req, res) => {
  const email = req.body.email;
  const query = "INSERT INTO Emaillists (email, createdAt, updatedAt) VALUES (?, NOW(), NOW())";
  console.log("query:"+query);
  //const query = 'INSERT INTO Emaillists (email) VALUES (?)';
  
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'insertion de l\'e-mail :', error);
      res.sendStatus(500);
    } else {
      console.log('E-mail enregistré avec succès');
      res.sendStatus(200);
    }
  });
});

module.exports = router;