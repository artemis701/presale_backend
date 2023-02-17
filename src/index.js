const app = require("./app");
const https = require("https");
const fs = require("fs");

const GAS_STATION = 'https://api.debank.com/chain/gas_price_dict_v2?chain=eth';
const GAS_STATION1 = 'https://api.debank.com/chain/gas_price_dict_v2?chain=bsc';

// var server = require('http').createServer(app);
// const port = process.env.PORT || 5000;
// server.listen(port, () => console.log(`Listening on port ${port}..`));

const httpsPort = 443;
const privateKey = fs.readFileSync("src/cert/private.key");
const certificate = fs.readFileSync("src/cert/certificate.crt");
const credentials = {
    key: privateKey,
    cert: certificate,
}

var server = https.createServer(credentials, app)
    .listen(httpsPort, () => {
        console.log(`[tokentrendingbot.org] servier is running at port ${httpsPort} as https.`);
    });

const io = require('socket.io')(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true
	}
});


