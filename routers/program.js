const express = require('express');
const routerProgramm = express.Router();
const {programm} = require('../courses.js').infoCourses;

//Middleware
routerProgramm.use(express.json());
// Middleware: Esto se ejecuta después de recibir una solicitud
// y antes de dar una respuesta.


routerProgramm.get('/', (req, res) => {
	// sending response as JSON format:
	res.send(JSON.stringify(programm));
});

routerProgramm.get('/:lenguaje', (req, res) => {
	const lenguaje = req.params.lenguaje;
	const resultados = programm.filter(curso => curso.lang === lenguaje);

	if(resultados.length === 0){
		return res.status(204).send(`No se encontraros cursos de ${lenguaje}.`);

		// Alternativa:
		// envía una respuesta vacía
		// por lo que no se está retornando nada
		// return res.status(404).end();

		// También podemos usar código 204
		// ya que no hubo un error pero no se encontró
		// contenido.
	}

	// Parámetros query
	// aquí leemos le parámetro query y podríamos utilizarlo
	if(req.query.ordenar === 'views'){
		res.send(JSON.stringify(resultados.sort( (a,b) => b.views - a.views)));
	}

	res.send(JSON.stringify(resultados));
});

routerProgramm.get('/api/courses/programm/:lenguaje/:nivel', (req, res) => {
	console.log('two params');

	const lang = req.params.lenguaje;
	const level = req.params.nivel;

	console.log(lang);
	console.log(level);

	const resultados = programm.filter(curso => curso.lang === lang && curso.level === level);

	if(resultados.length === 0){
		return res.status(404).send(`No se encontraron cursos de ${lang} con nivel ${level}`);
	}

	res.send(JSON.stringify(resultados));
});

routerProgramm.post('/', (req, res) => {
	let newCourse = req.body;
	programm.push(newCourse);
	res.send(JSON.stringify(programm));
});

routerProgramm.put('/:id', (req, res) => {
	const modCourse = req.body;
	const id = req.params.id;
	// no se usa === porque estamos comparando un string con un número
	// por lo tanto con == se comparan sin importar el tipo de dato
	const ind = programm.findIndex(course => course.id == id);
	if(ind >= 0){
		programm[ind] = modCourse;
	} else {
		res.status(404);
	}
	res.send(JSON.stringify(programm));
	// alternativas de lo de arriba:
	// res.send(programm);
	// res.json(programm);
});

routerProgramm.patch('/:id', (req, res) => {
	const infoActualizada = req.body;
	const id = req.params.id;
	const ind = programm.findIndex(course => course.id == id);

	if(ind >= 0){
		const cursoModificar = programm[ind];
		Object.assign(cursoModificar, infoActualizada);
	}
	res.send(JSON.stringify(programm));
});

routerProgramm.delete('/:id', (req, res) => {
	const id = req.params.id;
	const ind = programm.findIndex(course => course.id == id);

	if(ind >= 0){
		// cortamos el arreglo desde ind hasta 1 elemento
		programm.splice(ind, 1);
	}
	res.send(JSON.stringify(programm));
});
module.exports = routerProgramm;