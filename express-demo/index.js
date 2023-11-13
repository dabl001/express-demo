const express = require('express');
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const { log } = require('./middlewares/logger');
const courses = require('./routes/courses');
const main = require('./routes/main');

const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

app.set('view engine', 'pug');
app.set('views', './views'); //defaul we dont have to write this

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(log);

//routes
app.use('/', main);
app.use('/api/courses', courses);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...'); //console.log()
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
