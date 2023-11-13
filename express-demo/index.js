const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const { log } = require('./logger');
const express = require('express');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

app.set('view engine', 'pug');
app.set('views', './views'); //defaul we dont have to write this

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(log);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...'); //console.log()
}

const courses = [
    { id: 1, name: 'Node.js' },
    { id: 2, name: 'React.js' },
    { id: 3, name: 'Vue.js' },
];

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Response from server',
    });
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('The course with given ID was not found!');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = { id: courses.length + 1, name: req.body.name };
    if (validateCourse(course, res) === true) return;
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    if (findCourse(courses, req.params.id, res) === true) return;
    const course = { id: parseInt(req.params.id), name: req.body.name };
    if (validateCourse(course, res) === true) return;
    courses[parseInt(req.params.id) - 1] = course;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    if (findCourse(courses, req.params.id, res) === true) return;
    const course = courses[parseInt(req.params.id) - 1];
    courses.splice(parseInt(req.params.id) - 1, 1);
    res.send(course);
});

function findCourse(courses, id, res) {
    let course = courses.find((c) => c.id === parseInt(id));
    if (!course) {
        res.status(404);
        res.send('The course with given ID was not found!');
        return true;
    } else return false;
}

function validateCourse(course, res) {
    if (!course.name || !isNaN(course.name)) {
        res.status(400);
        res.send(
            'Not apprepriate post!, name is required and name should be string type'
        );
        return true;
    } else return false;
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
