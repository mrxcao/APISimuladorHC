const simular = require('../modules/simular');


module.exports = (app) => {
	app.post('/simulacao', async (req, res) => {

		const {
			valorDesejado,
			prazo,
		} = req.body;
		if (!valorDesejado || !prazo) {
			res.send('valorDesejado e prazo são obrigatorios', 403);
			throw 'valorDesejado e prazo são obrigatorios';
		}

		/*
		const sac = await simular.sac(valorDesejado, prazo);
		const price = await simular.price(valorDesejado, prazo);
*/

		const result = await simular.emprestimo(valorDesejado, prazo);


		res.send({ text:'teste ok', req: req.body, result });

	});
};