var database = require("../database/config");


function cadastrarProduto( nomeProduto, dtFabricacao, dtValidade, fabricante, valorCompra, valorVenda) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeProduto, dtFabricacao, dtValidade, fabricante, valorCompra, valorVenda);


    var instrucaoSql = `
        INSERT INTO produto (nomeProduto, dtFabricacao, dtValidade, fabricante, valorCompra, valorVenda) VALUES ('${nomeProduto}', '${dtFabricacao}', '${dtValidade}', '${fabricante}', '${valorCompra}', '${valorVenda}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarProduto
};