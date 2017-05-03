const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const donuteria = require('./routes/donuterias');

app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(express.static('./public'));
app.use('/donuterias', donuteria);

module.exports = app;