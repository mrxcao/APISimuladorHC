const mssql = require('mssql');

const db = (() => {
	const self = this;
	const instance = null;

	self.connect = () => {
		const config = {
			server: process.env.SQL_HOST,
			database: process.env.SQL_DB,
			user: process.env.SQL_LOGIN,
			password: process.env.SQL_PSW,
			port: process.env.SQL_PORT,
			dialect: 'mssql',
			options: {
				encrypt: 'Env.get(\'DB_ENCRYPT\', true)',
			},
		};
		return new mssql.ConnectionPool(config)
			.connect()
			.then(pool => {
				self.instance = pool;
				return true;
			});
	};

	self.disconnect = () => {
		return instance.disconnect();
	};

	self.query = query => {
		return new Promise((resolve) => {
			if (!query) resolve([]);
			self.connect().then(() => {
				const request = self.instance.request();
				request.query(query, (err, result) => {
					resolve(
						err ? err.originalError.message : result.recordset,
					);
				});
			});
		});
	};

	return this;
})();

module.exports = db;
