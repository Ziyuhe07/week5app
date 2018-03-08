//express is the server that forms parts of the nodejs program
var express = require('express');
var app = express();
// serve static files - e.g. html, css
app.use(express.static(__dirname));

var https = require('https');
var fs = require('fs')
var privateKey = fs.readFileSync('/home/studentuser/certs/client-key.pem').toString();
var certificate = fs.readFileSync('/home/studentuser/certs/client-cert.pem').toString();
var credentials = {key:privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(4443);


var xhr; //define the global variables to process the AJAX request
function callDivChange() {
	xhr = new XMLHttpRequest();
	var filename = document.getElementById("filename").value;
	xhr.open("GET", filename, true);
	xhr.onreadystatechange = processDivChange;
	try {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	catch (e) {
			// this only works in internet explorer
	}
	xhr.send();
}

function processDivChange(){
	if (xhr.readyState <4)   //while waiting response from server
	document.getElementById('div1').innerHTML = "loading...";
	
	else if (xhr.readyState == 4){    //4 = Response from server has been completely loaded.
		if (xhr.status == 200 && xhr.status < 300)
			//http status between 200 to 299 are all successful
		document.getElementById('div1').innerHTML = xhr.responseText;
	}
}