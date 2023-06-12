module.exports = (app) => {
	const get = require('./get');
	get(app);

	const psot = require('./post');
	psot(app);
};

