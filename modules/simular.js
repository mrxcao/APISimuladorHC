const mssql = require('../modules/mssql');


const buscarProdutos = async (valorDesejado, prazo) => {
	const query = `select * from dbo.PRODUTO  
	               where NU_MINIMO_MESES <= ${prazo}
				   and NU_MAXIMO_MESES >= ${prazo} 
				   and VR_MINIMO <= ${valorDesejado}
				   and VR_MAXIMO >= ${valorDesejado}`;
	const produtos = await mssql.query(query);
	return produtos;
};

const sac = async (valorDesejado, prazo, taxa) => {
	const result = {
		'tipo':'SAC',
		'parcelas': [],
	};

	const amortizacao = valorDesejado / prazo;
	const diminuicao = amortizacao * taxa ;

	let valJuros = valorDesejado * taxa ;
	let numero = 1;
	while (numero <= prazo) {
		result.parcelas.push({
			'numero': numero,
			'valorAmortizacao': parseFloat(amortizacao.toFixed(2)),
			'valorJuros': parseFloat(valJuros.toFixed(2)),
			'valorPrestacao': parseFloat((amortizacao + valJuros).toFixed(2)),
		});

		valJuros = valJuros - diminuicao;
		numero++;
	}
	return result;
};
const price = async (valorDesejado, prazo, taxa) => {
	const result = {
		'tipo':'PRICE',
		'parcelas': [],
	};

	const vJuros = taxa / (1 - Math.pow(1 + taxa, -prazo));
	const prestacao = valorDesejado * vJuros;

	let juros = valorDesejado * taxa;
	let amortizacao = prestacao - juros;

	let saldo = valorDesejado;
	let numero = 1;
	while (numero <= prazo) {
		result.parcelas.push({
			'numero': numero,
			'valorAmortizacao': parseFloat(amortizacao.toFixed(2)),
			'valorJuros': parseFloat(juros.toFixed(2)),
			'valorPrestacao':  parseFloat(prestacao.toFixed(2)),
		});

		saldo = saldo - amortizacao;
		juros = saldo * taxa;
		amortizacao = prestacao - juros;

		numero++;
	}
	return result;
};

const emprestimo = async (valorDesejado, prazo) => {
	const produtos = await buscarProdutos(valorDesejado, prazo);

	const result = [];
	for (const produto of produtos) {

		const _sac = await sac(valorDesejado, prazo, produto.PC_TAXA_JUROS);
		const _price = await price(valorDesejado, prazo, produto.PC_TAXA_JUROS);
		result.push({
			'codigoProduto': produto.CO_PRODUTO,
			'descricaoProduto': produto.NO_PRODUTO,
			'taxaJuros': produto.PC_TAXA_JUROS,
			'resultadoSimulacao': [_sac, _price],
		});
	}

	return result;

};


module.exports = {
	emprestimo,
};
