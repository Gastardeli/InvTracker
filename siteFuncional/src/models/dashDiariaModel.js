var database = require("../database/config")


function kpiProdutoVencido(idEmpresa) {
    var instrucao = `
        SELECT * FROM vw_kpiProdutoVencido
        WHERE idEmpresa = ${idEmpresa}
        ORDER BY dtValidade ASC
        LIMIT 1;
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiQtdLotesReposicao() {
    var instrucao = `
        SELECT * FROM vw_kpiQtdLotesReposicao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function kpiEstoqueVazio() {
    var instrucao = `
        SELECT * FROM vw_kpiEstoqueVazio;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarRegistro(idEmpresa) {
    var instrucao = `
    DELETE FROM lote
    WHERE idLote = (
        SELECT idLote FROM (
            SELECT 
                l.idLote
            FROM lote l
            JOIN produto p ON l.fkProduto = p.idProduto
            WHERE l.fkEmpresa = ${idEmpresa}
            ORDER BY dtValidade ASC
            LIMIT 1
        ) AS DeleteRegistro
    );
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    kpiProdutoVencido,
    kpiQtdLotesReposicao,
    kpiEstoqueVazio,
    deletarRegistro
};

