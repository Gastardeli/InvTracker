CREATE DATABASE invtracker;
USE invtracker;

CREATE TABLE empresa(
    id INT PRIMARY KEY AUTO_INCREMENT,
    statusCliente VARCHAR(8) DEFAULT 'Ativo',
    razao VARCHAR(45),
    cnpj VARCHAR(45),
    codigo_ativacao VARCHAR(50),
    CONSTRAINT chkClienteEmpresa
        CHECK (statusCliente IN('Ativo', 'Inativo'))
);

insert into empresa(razao, cnpj, codigo_ativacao) values ('Atacadinho', '03.091.654/0001-66', 'ATACA1');
insert into empresa (razao,cnpj, codigo_ativacao) values ('Sorvete', '75.770.032/0001-75', 'ATACA2');

CREATE TABLE pagamento(
idPagamento INT AUTO_INCREMENT,
quantidadeParcela INT,
dtContratacao DATETIME,
dtPagamento DATE,
dtVencimento DATE,
status_pagamento VARCHAR(25),
fkClientePagamento INT,
FOREIGN KEY (fkClientePagamento) REFERENCES empresa(id),
PRIMARY KEY(idPagamento, fkClientePagamento)
);

CREATE TABLE funcionario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
data_nascimento DATE,
senha VARCHAR(45),
email VARCHAR(45),
cpf CHAR(11),
cep CHAR(8),
fk_empresa INT,
FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);

CREATE TABLE estoque (
idEstoque INT,
tamanho INT,
estoqueNome VARCHAR(40),
fkEmpresa INT,
CONSTRAINT fkEmpresaEstoque
FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
PRIMARY KEY(idEstoque, fkEmpresa)
);

CREATE TABLE produto (
    idProduto INT AUTO_INCREMENT PRIMARY KEY,
    nomeProduto VARCHAR(50),
    dtFabricacao DATE,
    dtValidade DATE,
    fabricante VARCHAR(45),
    valorCompra DECIMAL(10 , 2 ),
    valorVenda DECIMAL(10 , 2 )
);


CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
nSerie VARCHAR(40),
statusSensor VARCHAR(15),
CONSTRAINT chkSensorStatus
CHECK (statusSensor IN('Ativo', 'Inativo'))
);

CREATE TABLE registro(
idRegistro INT AUTO_INCREMENT,
fkSensor INT,
CONSTRAINT ckRegistroSensor
FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
distancia INT,
statusAlerta VARCHAR(8),
CONSTRAINT chkAlerta
CHECK (statusAlerta IN('Normal', 'Perigo')),
dtRegistro DATETIME,
PRIMARY KEY(idRegistro, fkSensor)
);

CREATE TABLE lote (
	idLote INT,
    fkProduto INT,
    fkEmpresa INT,
    fkEstoque INT,
    fkSensor INT,
    dtEntrada DATETIME,
    dtSaida DATETIME,
    FOREIGN KEY (fkProduto) REFERENCES produto(idProduto),
    FOREIGN KEY (fkEstoque, fkEmpresa) REFERENCES estoque(idEstoque, fkEmpresa),
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    PRIMARY KEY (idLote, fkProduto, fkEstoque, fkEmpresa)
);

INSERT INTO estoque (idEstoque, tamanho, estoqueNome, fkEmpresa) VALUES
(1, 50, 'Estoque Central', 1),
(1, 50, 'Estoque Principal', 2);

INSERT INTO sensor (nSerie, statusSensor) VALUES
	('SN-A1', 'Ativo'),
	('SN-A2', 'Ativo'),
	('SN-A3', 'Ativo'),
	('SN-S1', 'Ativo'),
	('SN-S2', 'Ativo'),
	('SN-S3', 'Ativo');
    
INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 0, '2025-01-15 10:00:00'),
(2, 0, '2025-01-15 10:05:00'),
(3, 0, '2025-01-15 10:10:00'),
(4, 0, '2025-01-15 10:15:00'),
(5, 0, '2025-01-15 10:20:00'),
(6, 0, '2025-01-15 10:25:00');
    
INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 5, '2025-01-15 10:00:00'),
(2, 5, '2025-01-15 10:05:00'),
(3, 5, '2025-01-15 10:10:00'),
(4, 5, '2025-01-15 10:15:00'),
(5, 5, '2025-01-15 10:20:00'),
(6, 5, '2025-01-15 10:25:00');

INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 41, '2025-12-02 14:00:00'),  
(2, 41, '2025-12-02 14:01:00'), 
(4, 42, '2025-12-02 14:02:00'),  
(6, 45, '2025-12-02 14:03:00'); 

INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 41, '2025-12-02 14:00:00'),
(2, 41, '2025-12-02 14:01:00'),
(3, 10, '2025-12-02 14:02:00'), 
(4, 42, '2025-12-02 14:03:00'),
(5, 30, '2025-12-02 14:04:00'),  
(6, 45, '2025-12-02 14:05:00');


CREATE OR REPLACE VIEW vw_kpiProdutoVencido AS
SELECT 
    p.idProduto,
    p.nomeProduto,
    p.dtValidade,
    
    l.idLote,
    e.idEstoque,
    e.fkEmpresa AS idEmpresa,

    CASE
        WHEN DATEDIFF(p.dtValidade, CURDATE()) <= 0 THEN 'Vencido'
        ELSE DATEDIFF(p.dtValidade, CURDATE())
    END AS diasParaVencer

FROM produto p
JOIN lote l 
       ON l.fkProduto = p.idProduto
JOIN estoque e 
       ON e.idEstoque = l.fkEstoque
      AND e.fkEmpresa = l.fkEmpresa

ORDER BY p.dtValidade ASC
LIMIT 1;

-- ------------------------------------------------------------------------------

CREATE OR REPLACE VIEW vw_kpiEstoqueVazio AS
    SELECT 
        e.idEstoque,
        e.fkEmpresa AS idEmpresa,
        e.estoqueNome AS nomeEstoque,
        e.tamanho AS capacidadeTotal,
        r.distancia AS espacoVazio
    FROM
        lote l
            JOIN
        estoque e ON e.idEstoque = l.fkEstoque
        AND e.fkEmpresa = l.fkEmpresa
            JOIN
        sensor s ON s.idSensor = l.fkSensor
            JOIN
        (SELECT 
            fkSensor, MAX(dtRegistro) AS ultimoRegistro
        FROM
            registro
        GROUP BY fkSensor) last_r ON last_r.fkSensor = s.idSensor
            JOIN
        registro r ON r.fkSensor = s.idSensor
            AND r.dtRegistro = last_r.ultimoRegistro
    ORDER BY r.distancia DESC
    LIMIT 1;
    
-- -----------------------------------------------------------------------
CREATE OR REPLACE VIEW vw_kpiQtdLotesReposicao AS
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
        r.distancia > (e.tamanho * 0.80);
        -- OBS: COLOCAR WHERE empresa.id = ${}