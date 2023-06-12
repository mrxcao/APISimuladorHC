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

		console.log('valorDesejado', valorDesejado);
		console.log('prazo', prazo);
		const sac = await simular.sac(valorDesejado, prazo);
		const price = await simular.price(valorDesejado, prazo);
		const result = {
			sac,
			price,
		};


		res.send({ text:'teste ok', req: req.body, result });

	});
};