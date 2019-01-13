const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');

app.use(allowCrossDomain);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', router);

app.all('/', (req, res) => {
    res.send('Hello!');
});

//CORS Hack for development
function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
}

module.exports = app;