const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', async (req, res) => {
    const { fullname, login, password } = req.body;

  connection.query('INSERT INTO employees(`supervisor_id`, `full_name`, `login`, `password`) VALUES (?,?,?,?)', [req.session.user.id, fullname, login, password], (error, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding employee');
      return;
    }
    res.redirect('/crm/login');
  });
});

module.exports = router;
