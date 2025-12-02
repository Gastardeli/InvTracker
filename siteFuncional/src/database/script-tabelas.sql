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


insert into empresa(razao, cnpj, codigo_ativacao) values ('Atacadinho', '03.091.654/0001-66', 'ED145B');
insert into empresa (razao,cnpj, codigo_ativacao) values ('Sorvete', '75.770.032/0001-75', 'A1B2C3');

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
idEstoque INT PRIMARY KEY AUTO_INCREMENT,
tamanho DECIMAL(3,2),
estoque VARCHAR(40),
fkEmpresa INT,
CONSTRAINT fkEmpresaEstoque
FOREIGN KEY (fkEmpresa) REFERENCES empresa(id)
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
distancia DECIMAL(3,2),
statusAlerta VARCHAR(8),
CONSTRAINT chkAlerta
CHECK (statusAlerta IN('Normal', 'Perigo')),
dtRegistro DATETIME,
PRIMARY KEY(idRegistro, fkSensor)
);

CREATE TABLE lote (
    fkProduto INT,
    fkEstoque INT,
    fkSensor INT,
    dtEntrada DATETIME,
    dtSaida DATETIME,
    PRIMARY KEY (fkProduto, fkEstoque),
    FOREIGN KEY (fkProduto) REFERENCES produto(idProduto),
    FOREIGN KEY (fkEstoque) REFERENCES estoque(idEstoque),
    FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);


INSERT INTO estoque (tamanho, estoque, fkEmpresa) VALUES
(50.00, 'Estoque Central - A1', 1),
(50.00, 'Estoque Frios - A2', 1),
(50.00, 'Estoque Secos - A3', 1),
(50.00, 'Câmara Congelamento - S1', 2),
(50.00, 'Estoque Embalagens - S2', 2),
(50.00, 'Estoque Ingredientes - S3', 2);
    
INSERT INTO produto (nomeProduto, dtFabricacao, dtValidade, fabricante, valorCompra, valorVenda) VALUES
('Arroz Tipo 1 5kg', '2024-11-15', '2025-11-15', 'Tirol', 18.50, 28.00),
('Feijão Carioca 1kg', '2024-11-20', '2025-08-20', 'Kicaldo', 6.40, 10.00),
('Óleo de Soja 900ml', '2024-12-01', '2025-06-01', 'Soya', 5.20, 8.50);

INSERT INTO sensor (nSerie, statusSensor) VALUES
	('SN-A1', 'Ativo'),
	('SN-A2', 'Ativo'),
	('SN-A3', 'Ativo'),
	('SN-S1', 'Ativo'),
	('SN-S2', 'Ativo'),
	('SN-S3', 'Ativo');
    
INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 0.00, '2025-01-15 10:00:00'),
(2, 0.00, '2025-01-15 10:05:00'),
(3, 0.00, '2025-01-15 10:10:00'),
(4, 0.00, '2025-01-15 10:15:00'),
(5, 0.00, '2025-01-15 10:20:00'),
(6, 0.00, '2025-01-15 10:25:00');
    
INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 5.00, '2025-01-15 10:00:00'),
(2, 5.00, '2025-01-15 10:05:00'),
(3, 5.00, '2025-01-15 10:10:00'),
(4, 5.00, '2025-01-15 10:15:00'),
(5, 5.00, '2025-01-15 10:20:00'),
(6, 5.00, '2025-01-15 10:25:00');

INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 41.00, '2025-12-02 14:00:00'),  
(2, 41.00, '2025-12-02 14:01:00'), 
(4, 42.50, '2025-12-02 14:02:00'),  
(6, 45.00, '2025-12-02 14:03:00'); 

INSERT INTO registro (fkSensor, distancia, dtRegistro) VALUES
(1, 41.00, '2025-12-02 14:00:00'),
(2, 41.00, '2025-12-02 14:01:00'),
(3, 10.00, '2025-12-02 14:02:00'), 
(4, 42.50, '2025-12-02 14:03:00'),
(5, 30.00, '2025-12-02 14:04:00'),  
(6, 45.00, '2025-12-02 14:05:00');


CREATE OR REPLACE VIEW vw_kpiProdutoVencido AS
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
    
-- ------------------------------------------------------------------------------

CREATE OR REPLACE VIEW vw_kpiEstoqueVazio AS
    SELECT 
        e.idEstoque,
        e.estoque AS nomeEstoque,
        emp.razao AS empresa,
        e.tamanho AS capacidadeTotal,
        r.distancia AS espacoVazio,
        (e.tamanho - r.distancia) AS espacoOcupado,
        ROUND((r.distancia / e.tamanho) * 100, 2) AS porcentagemVazio
    FROM
        lote l
            JOIN
        estoque e ON e.idEstoque = l.fkEstoque
            JOIN
        empresa emp ON emp.id = e.fkEmpresa
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

