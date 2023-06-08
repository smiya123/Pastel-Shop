var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../connection');
const app = express();

router.get('/', function(req, res, next) {
  var message = req.query.message;
  res.render('crm/sign', { title: 'Pastel CRM Login', message: message });
});
const loginHandler = async (req, res,login, passLogin) => {
  try {
    if (!login) {
      return res.status(400).json({ errorMessage: 'Please provide a login.' });
    }
    connection.query('SELECT * FROM supervisors WHERE login = ? and password = ?', [login,passLogin], async (error, results, fields) => {
      
      if (error) {
        throw error;
      }
      const user = results[0];
      const full_name = user ? user.full_name : null;
      global.full_name=full_name;
      global.id_supervisor=user ? user.id:null;

      if (!user) {
        // le cas ou le login n'existe pas sur la table supervisor, il faut chercher dans la table employee
        try {
          connection.query('SELECT * FROM employees WHERE login = ? and password = ?', [login,passLogin], async (error, results, fields) => { 
            if (error) {
              throw error;
            }
            const employe = results[0];
            const full_name1 = employe ? employe.full_name : null;
            if (!employe) {
              
              return res.status(400).json({ errorMessage: 'The login and/or password are incorrect.' });
            }
            req.session.isLoggedIn = true;
            req.session.employe = employe;
            global.id_employee= employe.id;
            if (req.session.isLoggedIn) {
              connection.query("SELECT id,user_id,employee_id,full_name,address,phone_number,total,status,DATE_FORMAT(createdAt, '%d/%m/%Y') as createdAt,DATE_FORMAT(updatedAt, '%d/%m/%Y') as updatedAt FROM leads WHERE employee_id=?", [employe.id], (error, leads, fields) => {
                if (error) {
                  next(error);
                  return;
                }
                res.render('crm/employee', {
                  full_name1: full_name1,
                  leads: leads
                });
              });


            } else {
              res.status(400).json({ Message: true });
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).send('Error logging in user');
        }


      }
      else {
      req.session.isLoggedIn = true;
      req.session.user = user;
      if (req.session.isLoggedIn) {

        connection.query('SELECT * FROM employees WHERE supervisor_id = ?', [user.id], (error, employes, fields) => {
          if (error) {
            next(error);
            return;
          }
          connection.query('SELECT count(*) as nbp FROM leads WHERE status="pending" and employee_id in (select id from employees where supervisor_id=?)', [user.id], (error, nbrPending, fields) => {
            connection.query('SELECT count(*) as nbc FROM leads WHERE status="confirmed" and employee_id in (select id from employees where supervisor_id=?)', [user.id], (error, nbrConfirmed, fields) => {
              connection.query('SELECT count(*) as nbs FROM leads WHERE status="canceled" and employee_id in (select id from employees where supervisor_id=?)', [user.id], (error, nbrCanceled, fields) => {
                 console.log("nbrPending:",nbrPending);
                res.render('crm/admin', {
                    full_name: full_name,
                    employes: employes,
                    nbrPending:nbrPending[0].nbp,
                    nbrConfirmed:nbrConfirmed[0].nbc,
                    nbrCanceled:nbrCanceled[0].nbs

                });
              });
            });
          });
        });


      } else {
        res.status(400).json({ Message: true });
      }
    }
});

  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user');
  }
};

router.post('/login', async (req, res) => {
  const { login, passLogin } = req.body;
  global.login = login
  global.passLogin = passLogin
  await loginHandler(req, res,login, passLogin);
});


router.get('/login', async (req, res) => {
  login=global.login;
  passLogin=global.passLogin;
  await loginHandler(req, res,login, passLogin);
});

router.get('/history', async (req, res) => {
  login=global.login;
  passLogin=global.passLogin;
  id_employee=global.id_employee;
        connection.query('SELECT *  FROM leads WHERE status="confirmed" and employee_id=?', [id_employee], (error, leadsConfirmed, fields) => {
          connection.query('SELECT * FROM leads WHERE status="canceled" and employee_id=?', [id_employee], (error, leadsCanceled, fields) => {
            res.render('crm/histo', {
                leadsConfirmed: leadsConfirmed,
                leadsCanceled:leadsCanceled
            });
          });
      
        });
});
router.get('/message', async (req, res) => {
  login=global.login;
  passLogin=global.passLogin;
  id_employee=global.id_employee;
  connection.query("SELECT i.email, i.issue, i.response, e.full_name FROM `issues` as i, `employees` as e WHERE i.employee_id=e.id",  (error, issues, fields) => {
    res.render('crm/messages', {
                issues: issues,
            });
          });
      
       
});

router.get('/logout', async (req, res) => {
  req.session.destroy(function(err) {
    if(err) {
     console.log(err);
    } else {
     res.redirect('/crm');
    }
  });
});

const nodemailer = require('nodemailer');

router.post('/respond_issue', async (req, res) => {
    const { id_issue, email, response } = req.body;

  connection.query('UPDATE issues SET response = ? WHERE id = ?', [response, id_issue], (error, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding employee');
      return;
    }

    const emailSource= "chatbotpastel@gmail.com";
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
      from: emailSource,
      to: email,
      subject: 'Issue Response',
      html: "<h3>Message via <i> ChatBot </i> de la part de : " + emailSource + "</h3>" + response.replace(/\n/g, "<br>")
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

    res.redirect('/crm/issues');
  });
});

module.exports = router;


  module.exports = router;