const express = require('express');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine','pug');
app.set('views','./views'); // default

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/',home);
app.use('/api/courses',courses);

// Configuration
console.log(`Application name ${config.get('name')}`);
console.log(`Mail server ${config.get('mail.host')}`);


// How to use a certain feature only during the development 
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
}

// test dbDebugger
dbDebugger('Connected to DB');

app.use(logger)


app.listen(port, () => console.log(`Listening on port ${port}`));