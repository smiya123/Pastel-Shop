var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../connection');

router.get('/', function(req, res, next) {
  var message = req.query.message;

  connection.query("SELECT `id`, `email`, `issue` FROM `issues`",  (error, issues, fields) => {
    if (error) {
      next(error);
      console.log("erreur dans la requete");
      return;
    }
    res.render('crm/issues', {
      full_name: global.full_name,
      issues: issues
    });
  });
});

 
  module.exports = router;