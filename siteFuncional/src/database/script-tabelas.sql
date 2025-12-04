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
    fkProduto INT NULL,
    fkEmpresa INT,
    fkEstoque INT,
    fkSensor INT UNIQUE,
    dtEntrada DATETIME,
    dtSaida DATETIME,
    FOREIGN KEY (fkProduto) REFERENCES produto(idProduto),
    FOREIGN KEY (fkEstoque, fkEmpresa) REFERENCES estoque(idEstoque, fkEmpresa),
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    PRIMARY KEY (idLote, fkEstoque, fkEmpresa)
);

INSERT INTO estoque (idEstoque, tamanho, estoqueNome, fkEmpresa) VALUES
    (1, 23, 'Estoque A1', 1),
    (2, 150, 'Estoque A2', 1);

    INSERT INTO estoque (idEstoque, tamanho, estoqueNome, fkEmpresa) VALUES
    (1, 120, 'Estoque B1', 2),
    (2, 180, 'Estoque B2', 2);

    INSERT INTO produto (nomeProduto, dtFabricacao, dtValidade, fabricante, valorCompra, valorVenda) VALUES
    ('Arroz Tipo 1', '2025-01-01', '2026-01-01', 'Camil', 10, 15),
    ('Feijão Preto', '2025-01-05', '2026-01-05', 'Kicaldo', 8, 13),
    ('Macarrão Espaguete', '2025-01-10', '2026-01-10', 'Renata', 5, 9),
    ('Óleo de Soja', '2025-01-15', '2026-01-15', 'Soya', 6, 10),
    ('Açúcar Refinado', '2025-01-20', '2026-01-20', 'União', 4, 7),
    ('Café Torrado', '2025-01-25', '2026-01-25', 'Melitta', 12, 17);

    INSERT INTO produto (nomeProduto, dtFabricacao, dtValidade, fabricante, valorCompra, valorVenda) VALUES
    ('Sorvete Creme', '2025-02-01', '2025-07-01', 'Kibon', 12, 22),
    ('Sorvete Chocolate', '2025-02-05', '2025-07-05', 'Kibon', 12, 22),
    ('Sorvete Morango', '2025-02-10', '2025-07-10', 'Nestlé', 11, 21),
    ('Picolé Uva', '2025-02-12', '2025-06-12', 'Nestlé', 3, 6),
    ('Picolé Limão', '2025-02-15', '2025-06-15', 'Nestlé', 3, 6),
    ('Picolé Coco', '2025-02-18', '2025-06-18', 'Kibon', 3, 6);

    INSERT INTO sensor (nSerie, statusSensor)
    VALUES 
    ('SENSOR-EMP1-EST1-LOTE1', 'Ativo'),
    ('SENSOR-EMP1-EST1-LOTE2', 'Inativo'),
    ('SENSOR-EMP1-EST1-LOTE3', 'Inativo'),
    ('SENSOR-EMP1-EST1-LOTE4', 'Inativo'),
    ('SENSOR-EMP1-EST1-LOTE5', 'Inativo'),
    ('SENSOR-EMP1-EST1-LOTE6', 'Inativo'),
    ('SENSOR-EMP2-EST1-LOTE1', 'Inativo'),
    ('SENSOR-EMP2-EST1-LOTE2', 'Inativo'),
    ('SENSOR-EMP2-EST1-LOTE3', 'Inativo'),
    ('SENSOR-EMP2-EST1-LOTE4', 'Inativo'),
    ('SENSOR-EMP2-EST1-LOTE5', 'Inativo'),
    ('SENSOR-EMP2-EST1-LOTE1', 'Inativo');
    
    
    INSERT INTO lote (idLote, fkProduto, fkEmpresa, fkEstoque, fkSensor, dtEntrada, dtSaida)
    VALUES
    (1, 1, 1, 1, 1, '2025-03-01 10:00:00', NULL),
    (2, 2, 1, 1, 2, '2025-03-02 11:00:00', NULL),
    (3, 3, 1, 1, 3, '2025-03-03 12:00:00', NULL),

    (4, 4, 1, 2, 4, '2025-03-04 13:00:00', NULL),
    (5, 5, 1, 2, 5, '2025-03-05 14:00:00', NULL),
    (6, 6, 1, 2, 6, '2025-03-06 15:00:00', NULL);

    INSERT INTO lote (idLote, fkProduto, fkEmpresa, fkEstoque, fkSensor, dtEntrada, dtSaida)
    VALUES
    (1, 7, 2, 1, 7, '2025-04-01 10:00:00', NULL),
    (2, 8, 2, 1, 8, '2025-04-02 11:00:00', NULL),
    (3, 9, 2, 1, 9, '2025-04-03 12:00:00', NULL),

    (4, 10, 2, 2, 10, '2025-04-04 13:00:00', NULL),
    (5, 11, 2, 2, 11, '2025-04-05 14:00:00', NULL),
    (6, 12, 2, 2, 12, '2025-04-06 15:00:00', NULL);
    
INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(2, 10, '2025-01-15 10:05:00'),
(3, 15, '2025-01-15 10:10:00'),
(4, 125, '2025-01-15 10:15:00'),
(5, 50, '2025-01-15 10:20:00'),
(6, 40, '2025-01-15 10:25:00'),
(7, 110, '2025-01-15 10:00:00'),
(8, 40, '2025-01-15 10:05:00'),
(9, 60, '2025-01-15 10:10:00'),
(10, 100, '2025-01-15 10:15:00'),
(11, 120, '2025-01-15 10:20:00'),
(12, 30, '2025-01-15 10:25:00');

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

ORDER BY p.dtValidade ASC;

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
        registro r ON r.fkSensor = s.idSensor
    ORDER BY r.distancia DESC;