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
    r.distancia > (e.tamanho * 0.80)
        AND empresa.id = 1; -- Obs no lugar de 1 deve ir o ${empresa_id} na qual o gustavo criou
-- Obs2: essa parte  - r.distancia > (e.tamanho * 0.80) -  mostra a distância captada pelo sensor cujo tamanho é maior q 80 o tamanho total do estoque 
*/