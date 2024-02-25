const express = require('express');
const my_app = express();

// const courses = require('./courses.js');
const {infoCourses} = require('./courses.js');

// ------ Routing / Routes
my_app.get('/', (req, res) => {
	res.send('My first server with Express.');
});

my_app.get('/api/courses/programm', (req, res) => {
	res.send(JSON.stringify(infoCourses.programm));
});

my_app.get('/api/courses', (req, res) => {
	// sending response as JSON format:
	res.send(JSON.stringify(infoCourses));
});

my_app.get('/api/courses/maths', (req, res) => {
	res.send(JSON.stringify(infoCourses.maths));
});

// Después de ':' lo que sigue es un parámetro URL.
// Se pueden extraer en el objeto de solicitud (request).

// Para cursos de programación
my_app.get('/api/courses/programm/:lenguaje', (req, res) => {
	const lenguaje = req.params.lenguaje;
	const resultados = infoCourses.programm.filter(curso => curso.lang === lenguaje);

	if(resultados.length === 0){
		return res.status(404).send(`No se encontraros cursos de ${lenguaje}.`);
	}
	res.send(JSON.stringify(resultados));
});

// Para cursos de matemáticas
my_app.get('/api/courses/maths/:tema', (req, res) => {
	const tema = req.params.tema;
	const resultados = infoCourses.maths.filter(curso => curso.topic ===  tema);

	if(resultados.length === 0){
		return res.status(404).send(`No se encontraros cursos de ${lenguaje}.`);
	}
	res.send(JSON.stringify(resultados));
});

// Usando más de un parámetro:
my_app.get('api/courses/programm/:lenguaje/:nivel', (req, res) => {
	const lang = req.params.lenguaje;
	const level = req.params.nivel;
});


// ------ Port
// process.env.PORT: si es un puerto definido en el ambiente
// caso contrario será el puerto 3000.
const PORT = process.env.PORT || 3000;
my_app.listen(PORT, () => {
	console.log('Listening on the port: ' + PORT  + "...");
});