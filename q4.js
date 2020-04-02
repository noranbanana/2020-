const express = require('express')
const app = express()
const port = 8000
const email = "hojongzang@naver.com"
const stuno = "20151598"
app.use(express.json())
require('date-utils')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	var moment = require('moment');
	require('moment-timezone');
	moment.tz.setDefault("Asia/Seoul");
	var date = moment().format('YYYY-MM-DD HH:mm:ss');


        req.query.ip = req.ip.split(':')[3];
        req.query.time = date;
        req.query.email = email;
        req.query.stuno = stuno;
        res.send(req.query);
})

app.post('*', (req, res) => {
	r = req.body
	r.ip = req.ip.replace(/^.*:/, '')
	var moment = require('moment');
        require('moment-timezone');
        moment.tz.setDefault("Asia/Seoul");
        var date = moment().format('YYYY-MM-DD HH:mm:ss');

	r.time = date;
	r.email = "hojongzang@naver.com"
	r.stuno = "20151598"
	res.send(r)
})


app.get('/:a/:b', (req, res) => {
	var moment = require('moment');
	require('moment-timezone');
	moment.tz.setDefault("Asia/Seoul");
	var date = moment().format('YYYY-MM-DD HH:mm:ss');

        req.params.time = date;
        req.params.email = email;
        req.params.stuno = stuno;
        res.send(req.params);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

