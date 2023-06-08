const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/:leadsId', async (req, res) => {
  const leadsId = req.params.leadsId;
  connection.query('UPDATE  leads SET status ="confirmed" WHERE id = ?', [leadsId], (error, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updting leads');
      return;
    }
    // Rediriger vers la page d'administration ou une autre page appropriée
    res.redirect('/crm/login');
  });
});

module.exports = router;
