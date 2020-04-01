const request = require('request');
mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'mydb'
})
connection.connect();



request('http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144065500', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        temp_start = body.indexOf('<temp>') + 6;
        tmp_body = body.slice(temp_start);
        temp_end = tmp_body.indexOf('</temp>');
        tpr = tmp_body.slice(0, temp_end);
	var query = connection.query("insert into sensors (seq, type, device, unit, ip, value) values (1, 'T', 102, 0, '192.168.1.1', "+tpr+")", function(err, rows, cols) {
        	if (err) throw err;
	});
});




var minutes = 10, interval = minutes * 60 * 1000;
setInterval(function() {
	tpr = "";
	request('http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144065500', { json: true }, (err, res, body) => {
	        if (err) { return console.log(err); }
        	temp_start = body.indexOf('<temp>') + 6;
        	tmp_body = body.slice(temp_start);
        	temp_end = tmp_body.indexOf('</temp>');
        	tpr = tmp_body.slice(0, temp_end);
		var query = connection.query("insert into sensors (seq, type, device, unit, ip, value) values (1, 'T', 102, 0, '192.168.1.1', "+tpr+")", function(err, rows, cols) {
			if (err) throw err;
		});
	});


}, interval);
/*var query = connection.query("insert into sensors (seq, type, device, unit, ip, value) values (1, 'T', 102, 0, '192.168.1.1', 10.9)", function(err, rows, cols) {
  if (err) throw err;
  console.log("done");
  process.exit();
});*/
