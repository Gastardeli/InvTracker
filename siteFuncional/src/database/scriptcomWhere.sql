-- Script com Where (Não Copiar)

CREATE VIEW VW_DashboardDiaria AS

(SELECT 'kpi_reabastecimento' AS tipo,CONCAT(COUNT(*)) AS valor,'' AS valor2,'' AS valor3
    FROM lote l JOIN sensor s ON s.idSensor = l.fkSensor JOIN registro r ON r.fkSensor = s.idSensor
    JOIN estoque e ON e.idEstoque = l.fkEstoque WHERE e.fkEmpresa = '${idUser}' AND r.distancia < 'X')
UNION ALL
(
    SELECT
        'kpi_estoque_critico' AS tipo,
        CONCAT(e.idEstoque) AS valor,
        '' AS valor2,
        '' AS valor3
    FROM estoque e
    JOIN lote l ON l.fkEstoque = e.idEstoque
    JOIN sensor s ON s.idSensor = l.fkSensor
    JOIN registro r ON r.fkSensor = s.idSensor
    WHERE e.fkEmpresa = '${idUser}'
    GROUP BY e.idEstoque
    ORDER BY AVG(r.distancia) ASC 
    LIMIT 1
)

UNION ALL

(
    SELECT
        'kpi_vencimento' AS tipo,
        CONCAT(l.fkProduto, '-', l.fkEstoque) AS valor,
        CONCAT(e.idEstoque) AS valor2,
        CONCAT(p.dtValidade) AS valor3
    FROM lote l
    JOIN produto p ON p.idProduto = l.fkProduto
    JOIN estoque e ON e.idEstoque = l.fkEstoque
    WHERE e.fkEmpresa = '${idUser}'
    ORDER BY p.dtValidade ASC
    LIMIT 1
)

UNION ALL

(
    SELECT
        'grafico_criticos' AS tipo,
        CONCAT(l.fkProduto, '-', l.fkEstoque) AS valor,
        CONCAT(e.idEstoque) AS valor2,
        CONCAT(r.distancia) AS valor3
    FROM estoque e
    JOIN lote l ON l.fkEstoque = e.idEstoque
    JOIN sensor s ON s.idSensor = l.fkSensor
    JOIN registro r ON r.fkSensor = s.idSensor
    WHERE e.fkEmpresa = '${idUser}'
      AND r.distancia < 'X'
);

CREATE VIEW VW_DashboardEstoque AS 

(
    SELECT
        'grafico_ocupacao' AS tipo,
        CONCAT(l.fkProduto, '-', l.fkEstoque) AS valor,
        CONCAT(r.distancia) AS valor2,
        '' AS valor3
    FROM lote l
    JOIN estoque e ON e.idEstoque = l.fkEstoque
    JOIN sensor s ON s.idSensor = l.fkSensor
    JOIN registro r ON r.fkSensor = s.idSensor
    WHERE l.fkEstoque = ${idEstoque}
      AND e.fkEmpresa = ${idUser}
)

UNION ALL

(
    SELECT
        'kpi_lote_critico' AS tipo,
        CONCAT(l.fkProduto, '-', l.fkEstoque) AS valor,
        CONCAT(r.distancia) AS valor2,
        '' AS valor3
    FROM lote l
    JOIN estoque e ON e.idEstoque = l.fkEstoque
    JOIN sensor s ON s.idSensor = l.fkSensor
    JOIN registro r ON r.fkSensor = s.idSensor
    WHERE l.fkEstoque = ${idEstoque}
      AND e.fkEmpresa = ${idUser}
    ORDER BY r.distancia ASC
    LIMIT 1
)

UNION ALL

(
    SELECT
        'kpi_qtd_criticos' AS tipo,
        CONCAT(COUNT(*)) AS valor,
        '' AS valor2,
        '' AS valor3
    FROM lote l
    JOIN estoque e ON e.idEstoque = l.fkEstoque
    JOIN sensor s ON s.idSensor = l.fkSensor
    JOIN registro r ON r.fkSensor = s.idSensor
    WHERE l.fkEstoque = ${idEstoque}
      AND r.distancia < X
      AND e.fkEmpresa = ${idUser}
)

UNION ALL

(
    SELECT
        'grafico_criticos' AS tipo,
        CONCAT(l.fkProduto, '-', l.fkEstoque) AS valor,
        CONCAT(r.distancia) AS valor2,
        '' AS valor3
    FROM lote l
    JOIN estoque e ON e.idEstoque = l.fkEstoque
    JOIN sensor s ON s.idSensor = l.fkSensor
    JOIN registro r ON r.fkSensor = s.idSensor
    WHERE l.fkEstoque = ${idEstoque}
      AND r.distancia < X
      AND e.fkEmpresa = ${idUser}
);