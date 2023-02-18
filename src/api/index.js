const express = require('express');
const router = express.Router();
const rounds = require("./controller");

router.post('/sendemail', rounds.sendemail);
router.post('/savetofile', rounds.savetofile);
router.post('/contact_us', rounds.contactus);
router.post('/tcc', rounds.totoalConnectionCount);

module.exports = router;
