var database = require("../database/config")


function kpiProdutoVencido(idEmpresa) {
    var instrucao = `
        SELECT * from vw_kpiProdutoVencido 
        WHERE idEmpresa = ${idEmpresa} AND 
        (SELECT MIN(dtValidade) FROM vw_kpiProdutoVencido);
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
        fkSensor, MAX(idRegistro) AS ultimoRegistro
    FROM
        registro
    GROUP BY fkSensor) ult ON ult.fkSensor = s.idSensor
        JOIN
    registro r ON r.fkSensor = s.idSensor
    AND r.idRegistro = ult.ultimoRegistro
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
            AND 
        (SELECT MIN(dtValidade) FROM vw_kpiProdutoVencido)
        ) AS DeleteRegistro
    );
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function graficoLotesDefasados(idEmpresa) {
    var instrucao = `
        SELECT 
            CONCAT('E', e.idEstoque, ' - L', l.idLote) AS identificacao,
            ROUND(((e.tamanho - r.distancia) / e.tamanho) * 100, 2) AS taxa_ocupacao
        FROM lote l
        JOIN estoque e 
            ON e.idEstoque = l.fkEstoque 
            AND e.fkEmpresa = l.fkEmpresa
        JOIN sensor s 
            ON s.idSensor = l.fkSensor
        JOIN (
            SELECT r1.*
            FROM registro r1
            JOIN (
                SELECT fkSensor, MAX(idRegistro) AS ultimo_registro
                FROM registro
                GROUP BY fkSensor
            ) r2 
            ON r1.fkSensor = r2.fkSensor 
            AND r1.idRegistro = r2.ultimo_registro
        ) AS r
        ON r.fkSensor = s.idSensor
        WHERE l.fkEmpresa = ${idEmpresa}
        ORDER BY e.idEstoque, l.idLote;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    kpiProdutoVencido,
    kpiQtdLotesReposicao,
    kpiEstoqueVazio,
    deletarRegistro,
    graficoLotesDefasados
};

