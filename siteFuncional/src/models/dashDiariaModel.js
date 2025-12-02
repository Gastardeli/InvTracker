var database = require("../database/config")

function dashDiarialistar() {
    var instrucao = `
        SELECT * FROM VW_DashboardDiaria;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    dashDiarialistar
};

/* SELECT DE QUANTOS LOTES PRECISAM DE REPOSIÇÃO */
/*
create or replace view vw_kpiQtdLotesReposicao as
    SELECT 
    COUNT(DISTINCT l.fkEstoque) AS EstoquesQuePrecisamReposicao
FROM
    lote l
        JOIN
    estoque e ON e.idEstoque = l.fkEstoque
        JOIN
    empresa ON empresa.id = e.fkEmpresa
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
    r.distancia > (e.tamanho * 0.80); -- Obs no lugar de 1 deve ir o ${empresa_id} na qual o gustavo criou
-- Obs2: essa parte  - r.distancia > (e.tamanho * 0.80) -  mostra a distância captada pelo sensor cujo tamanho é maior q 80 o tamanho total do estoque 
*/

/* SELECT DO ESTOQUE COM MAIOR NECESSIDADE DE REPOSIÇÃO */
/*

create or replace view vw_kpiEstoqueVazio as
    SELECT 
    e.idEstoque,
    e.estoque AS nomeEstoque,
    emp.razao AS empresa,
    e.tamanho AS capacidadeTotal,
    r.distancia AS espacoVazio,
    (e.tamanho - r.distancia) AS espacoOcupado,
    ROUND((r.distancia / e.tamanho) * 100, 2) AS porcentagemVazio
FROM lote l
JOIN estoque e ON e.idEstoque = l.fkEstoque
JOIN empresa emp ON emp.id = e.fkEmpresa
JOIN sensor s ON s.idSensor = l.fkSensor
JOIN (
    SELECT fkSensor, MAX(dtRegistro) AS ultimoRegistro
    FROM registro
    GROUP BY fkSensor
) last_r ON last_r.fkSensor = s.idSensor
JOIN registro r ON r.fkSensor = s.idSensor AND r.dtRegistro = last_r.ultimoRegistro
ORDER BY r.distancia DESC  
LIMIT 1;

*/
/* OBS, AO USER ESSE SELECT NO FETCH, VC IRÁ COLOCAR NO INNERHTML APENAS O ' e.idEstoque' EXEMPLO : ESTOQUE
                                                                                                       X  */

/* PRODUTO COM A DATA DE VENCIMENTO MAIS PRÓXIMA*/    
/*
create or replace view vw_kpiProdutoVencido as
SELECT 
    idProduto,
    nomeProduto,
    dtValidade,
    CASE
        WHEN DATEDIFF(dtValidade, CURDATE()) <= 0 THEN 'Vencido'
        ELSE DATEDIFF(dtValidade, CURDATE())
    END AS diasParaVencer
FROM
    produto
ORDER BY dtValidade ASC
LIMIT 1;

*/                                                                                                  