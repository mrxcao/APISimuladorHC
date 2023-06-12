const pkg = require('../package.json');
const sql = require('../modules/mssql');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.send(`${pkg.name} is on`);
	});

	app.get('/produtos', async (req, res) => {
		let query = 'select * from dbo.PRODUTO';
		console.log('req.body', req.query);

		if (req?.query) {
			console.log('1', 1);
			query += ' where CO_PRODUTO =  ' + req.query.id;
		}
		const data = await sql.query(query);
		res.send({ ok:true, data });
	});
};
