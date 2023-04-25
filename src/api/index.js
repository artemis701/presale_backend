const express = require('express');
const router = express.Router();
const rounds = require("./controller");

router.post('/sendemail', rounds.sendemail);
router.post('/savetofile', rounds.savetofile);
router.post('/contact_us', rounds.contactus);
router.post('/tcc', rounds.totoalConnectionCount);
router.get('/getapikey', rounds.getAPIKey);
router.get('/getbsctokinfo', rounds.getBSCTokenInfo);
router.get('/getethtokinfo', rounds.getETHTokenInfo);

router.get('/getspltokinfo', rounds.getSPLTokenInfo);
router.get('/getmetaplexinfo', rounds.getMetaplexInfo);

module.exports = router;
