const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ensureAuth = require('./auth/ensure-auth')();
const app = express();
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use(bodyParser.json());

const auth = require('./routes/auth');
const donuteria = require('./routes/donuterias');

app.use('/auth', auth);
app.use('/donuterias', ensureAuth, donuteria);

app.use(errorHandler());

module.exports = app;