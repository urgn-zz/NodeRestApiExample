const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', router);

app.all('/', (req, res) => {
    res.send('Hello!');
});

module.exports = app;