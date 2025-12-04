var database = require("../database/config");

function graficoDoisEstadoCritico(idEstoque, idEmpresa, res) {
  var instrucaoSql = `
      SELECT DISTINCT
          l.idLote,
          l.fkEmpresa,
          p.nomeProduto,
          e.idEstoque,
          e.tamanho AS capacidadeTotal,
          r.distancia AS distanciaAtual,
          ROUND(((e.tamanho - r.distancia) / e.tamanho) * 100, 2) AS percentualOcupado
      FROM lote l
	JOIN produto p 
          ON p.idProduto = l.fkProduto
      JOIN estoque e 
          ON e.idEstoque = l.fkEstoque
          AND e.fkEmpresa = l.fkEmpresa
      JOIN sensor s 
          ON s.idSensor = l.fkSensor
      JOIN (
              SELECT fkSensor, MAX(idRegistro) AS ultimoRegistro
              FROM registro
              GROUP BY fkSensor
          ) ult 
          ON ult.fkSensor = s.idSensor
      JOIN registro r 
          ON r.fkSensor = s.idSensor
        AND r.idRegistro = ult.ultimoRegistro
      WHERE 
          e.idEstoque = ${idEstoque} AND
          l.fkEmpresa = ${idEmpresa}
      HAVING 
          percentualOcupado < 20;
    `;

  return database.executar(instrucaoSql);
}

function graficoOcupacaoLotes(idEstoque, idEmpresa, res) {
  var instrucaoSql = `
         SELECT 
            l.idLote,
            l.fkEmpresa,
            p.nomeProduto,
            e.idEstoque,
            e.tamanho AS capacidadeTotal,
            r.distancia AS distanciaAtual,
            ROUND(((e.tamanho - r.distancia) / e.tamanho) * 100, 2) AS percentualOcupado
        FROM lote l
        JOIN produto p 
            ON p.idProduto = l.fkProduto
        JOIN estoque e 
            ON e.idEstoque = l.fkEstoque
          AND e.fkEmpresa = l.fkEmpresa   
        JOIN sensor s 
            ON s.idSensor = l.fkSensor
        JOIN (
                SELECT fkSensor, MAX(idRegistro) AS ultimoRegistro
                FROM registro
                GROUP BY fkSensor
            ) ult 
            ON ult.fkSensor = s.idSensor
        JOIN registro r 
            ON r.fkSensor = s.idSensor
          AND r.idRegistro = ult.ultimoRegistro
        WHERE  
            e.idEstoque = ${idEstoque} AND
            l.fkEmpresa = ${idEmpresa}
        ORDER BY 
            percentualOcupado DESC;

    `;

  return database.executar(instrucaoSql);
}

function loteComMaiorNecessidade(idEmpresa) {
  var instrucaoSql = `
  `

}

function qtdeLotesReabastecimento(idEmpresa) {
  var instrucaoSql = `
  `
}

module.exports = {
  graficoDoisEstadoCritico,
  graficoOcupacaoLotes,
  loteComMaiorNecessidade,
  qtdeLotesReabastecimento
};
