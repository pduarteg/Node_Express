const express = require('express');
const {maths} = require('../courses.js').infoCourses;
const routerMath = express.Router();

routerMath.get('/:tema', (req, res) => {
	const tema = req.params.tema;
	const resultados = maths.filter(curso => curso.topic ===  tema);

	if(resultados.length === 0){
		return res.status(404).send(`No se encontraros cursos de ${lenguaje}.`);
	}
	res.send(JSON.stringify(resultados));
});

routerMath.get('/', (req, res) => {
	res.send(JSON.stringify(maths));
});

module.exports = routerMath;