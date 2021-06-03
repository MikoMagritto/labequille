require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');


mongoose
  .connect("mongodb+srv://ChloeT:AxC36oVEkWZF775W@cluster0.jwh3k.mongodb.net/labequille", { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
require('./configs/session.config')(app);

// bind user to view - locals
const bindUserToViewLocals = require('./configs/user-locals.config');


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bindUserToViewLocals);

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));




// default value for title local
app.locals.title = 'La Béquille';


const authRoute = require('./routes/auth.routes');
const index = require('./routes/index');
const veloRoute = require('./routes/velo.routes')
app.use('/', index);
app.use('/', authRoute)
app.use('/', veloRoute)


module.exports = app;

