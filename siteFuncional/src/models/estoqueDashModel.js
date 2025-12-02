  var database = require("../database/config");

  function graficoDoisEstadoCritico() {
    var instrucaoSql = `
      SELECT 
          l.fkProduto AS idLote,
          p.nomeProduto,
          e.idEstoque,
          e.tamanho AS capacidadeTotal,
          r.distancia AS distanciaAtual,
          ROUND((r.distancia / e.tamanho) * 100, 2) AS percentualOcupado
      FROM lote l
      JOIN produto p 
          ON p.idProduto = l.fkProduto
      JOIN estoque e 
          ON e.idEstoque = l.fkEstoque
      JOIN sensor s 
          ON s.idSensor = l.fkSensor
      JOIN (
              SELECT fkSensor, MAX(dtRegistro) AS ultimoRegistro
              FROM registro
              GROUP BY fkSensor
          ) ult 
          ON ult.fkSensor = s.idSensor
      JOIN registro r 
          ON r.fkSensor = s.idSensor
        AND r.dtRegistro = ult.ultimoRegistro
      WHERE 
          e.idEstoque = 1
      HAVING 
          percentualOcupado < 20;
    `;

    return database.executar(instrucaoSql);
  }

  function graficoOcupacaoLotes() {
    var instrucaoSql = `
      SELECT 
          l.fkProduto AS idLote,
          p.nomeProduto,
          e.idEstoque,
          e.tamanho AS capacidadeTotal,
          r.distancia AS distanciaAtual,
          ROUND((r.distancia / e.tamanho) * 100, 2) AS percentualOcupado
      FROM lote l
      JOIN produto p 
          ON p.idProduto = l.fkProduto
      JOIN estoque e 
          ON e.idEstoque = l.fkEstoque
      JOIN sensor s 
          ON s.idSensor = l.fkSensor
      JOIN (
              SELECT fkSensor, MAX(dtRegistro) AS ultimoRegistro
              FROM registro
              GROUP BY fkSensor
          ) ult 
          ON ult.fkSensor = s.idSensor
      JOIN registro r 
          ON r.fkSensor = s.idSensor
        AND r.dtRegistro = ult.ultimoRegistro
      WHERE 
          e.idEstoque = 1
      ORDER BY percentualOcupado DESC;
    `; 

    return database.executar(instrucaoSql);
  }

  module.exports = {
    graficoDoisEstadoCritico,
    graficoOcupacaoLotes
  };
