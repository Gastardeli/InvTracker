var database = require("../database/config");


function cadastrarProduto(fkEstoque, fkLote, nomeProduto, dtFabricação, dtValidade, fabricante, valorCompra, valorVenda)  {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);

   
    var instrucaoSql = `
        INSERT INTO produto  VALUES (${DEFAULT},${fkEstoque}, ${fkLote}, '${nomeProduto}', '${dtFabricação}', '${dtValidade}', '${fabricante}', '${valorCompra}', ${valorVenda});
    `;//verificar os valores inseridos nesse insert e garantir que esta igual no banco.
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarProduto
};