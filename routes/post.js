const simular = require('../modules/simular');
// const eventHub = require('../modules/eventHub');

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
		const result = await simular.emprestimo(valorDesejado, prazo);

		// eventHub.send(result);

		res.send(result);

	});
};