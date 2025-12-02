var database = require("../database/config")


function kpiProdutoVencido(){
     var instrucao = `
        SELECT * FROM vw_kpiProdutoVencido;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiQtdLotesReposicao(){
     var instrucao = `
        SELECT * FROM vw_kpiQtdLotesReposicao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function kpiEstoqueVazio(){
     var instrucao = `
        SELECT * FROM vw_kpiEstoqueVazio;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    kpiProdutoVencido,
    kpiQtdLotesReposicao,
    kpiEstoqueVazio
};

