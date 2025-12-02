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

function kpiQtdLotesReposicao(idEmpresa) {
    var instrucao = `
SELECT 
    l.fkEstoque,
    l.idLote,
    l.fkProduto,
    e.estoqueNome,
    e.tamanho AS capacidadeEstoque,
    r.distancia AS distanciaAtual
        FROM
    lote l
        JOIN
    estoque e ON e.idEstoque = l.fkEstoque AND e.fkEmpresa = l.fkEmpresa
        JOIN
    sensor s ON s.idSensor = l.fkSensor
        JOIN
    (SELECT 
        fkSensor, MAX(dtRegistro) AS ultimoRegistro
    FROM
        registro
    GROUP BY fkSensor) ult ON ult.fkSensor = s.idSensor
        JOIN
    registro r ON r.fkSensor = s.idSensor
    AND r.dtRegistro = ult.ultimoRegistro
        WHERE
    e.fkEmpresa = ${idEmpresa}
    AND 
    r.distancia > (e.tamanho * 0.80)
       ORDER BY 
    r.distancia DESC;
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
    UPDATE lote SET
    fkProduto = null,
    dtEntrada = null
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

