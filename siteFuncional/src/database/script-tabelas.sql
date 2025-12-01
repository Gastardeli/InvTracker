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
SELECT 
    *
FROM
    estoque;
INSERT INTO estoque (tamanho, estoque, fkEmpresa) VALUES 
(5.50, 'Estoque Central - A1', 1),
(2.00, 'Estoque Frios - A2', 1),
(1.75, 'Estoque Secos - A3', 1);

INSERT INTO estoque (tamanho, estoque, fkEmpresa) VALUES
(6.00, 'Câmara Congelamento - S1', 2),
(1.00, 'Estoque Embalagens - S2', 2),
(3.50, 'Estoque Ingredientes - S3', 2);



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

