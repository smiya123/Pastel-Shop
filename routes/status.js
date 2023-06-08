var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../connection');

router.get('/', function(req, res, next) {
  var message = req.query.message;
  const id_supervisor=global.id_supervisor;
  console.log("id_supervisor: "+id_supervisor);
  connection.query("SELECT e.full_name as empl_fullname,l.id,l.user_id,l.employee_id,l.full_name,l.address,l.phone_number,l.total,l.status,DATE_FORMAT(l.createdAt, '%d/%m/%Y') as createdAt,DATE_FORMAT(l.updatedAt, '%d/%m/%Y') as updatedAt FROM leads l, supervisors s, employees e WHERE s.id=e.supervisor_id and e.id=l.employee_id and s.id=?", [id_supervisor], (error, leads, fields) => {
    if (error) {
      next(error);
      console.log("erreur dans la requete");
      return;
    }
    const groupedLeads = leads.reduce((groups, lead) => {
      if (!groups[lead.id_empl]) {
        groups[lead.id_empl] = [];
      }
      groups[lead.id_empl].push(lead);
      return groups;
    }, {});

    res.render('crm/status', {
      full_name: global.full_name,
      leads: leads,
      groupedLeads
    });
  });
});

 
  module.exports = router;