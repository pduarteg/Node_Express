const express = require('express');
const routerProgramm = express.Router();
const {programm} = require('../courses.js').infoCourses;

routerProgramm.get('/', (req, res) => {
	// sending response as JSON format:
	res.send(JSON.stringify(programm));
});

routerProgramm.get('/:lenguaje', (req, res) => {
	const lenguaje = req.params.lenguaje;
	const resultados = programm.filter(curso => curso.lang === lenguaje);

	if(resultados.length === 0){
		return res.status(404).send(`No se encontraros cursos de ${lenguaje}.`);
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

module.exports = routerProgramm;