const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/:employeeId', async (req, res) => {
  const employeeId = req.params.employeeId;
  console.log("l'id de l'employé à supprimer: ", employeeId);
  // Supprimer l'employé de la base de données
  //connection.query('DELETE FROM leads WHERE employee_id = ?', [employeeId], (error, fields) => {});
  connection.query('DELETE FROM employees WHERE id = ?', [employeeId], (error, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting employee');
      return;
    }
  });
  connection.query('SELECT * FROM employees ORDER BY RAND() LIMIT 1', [employeeId], (error,employee, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating leads');
      return;
    }

    connection.query('UPDATE leads SET employee_id = ? WHERE employee_id IS NULL', [employee[0].id], (error, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating leads');
        return;
      }
      // Rediriger vers la page d'administration ou une autre page appropriée
      res.redirect('/crm/login');
    });
  });
});

module.exports = router;
