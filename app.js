const express = require('express');
const my_app = express();

// const courses = require('./courses.js');
const {infoCourses} = require('./courses.js');

// ------ Routers
const routerProgramm = require('./routers/program.js');
const routerMath = require('./routers/maths.js');

// Asociamos la ruta al router

my_app.use('/api/courses/programm', routerProgramm);
my_app.use('/api/courses/maths', routerMath);

// ------ Routing / Routes
my_app.get('/', (req, res) => {
	res.send('My second server with Express.');
});

my_app.get('/api/courses', (req, res) => {
	res.send(JSON.stringify(infoCourses));
});

// ------ Port
// process.env.PORT: si es un puerto definido en el ambiente
// caso contrario será el puerto 3000.
const PORT = process.env.PORT || 3000;
my_app.listen(PORT, () => {
	console.log('Listening on the port: ' + PORT  + "...");
});