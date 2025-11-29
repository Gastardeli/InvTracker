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
    fkEstoque INT,
    FOREIGN KEY (fkEstoque)
        REFERENCES estoque (idEstoque),
  
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
idLote INT AUTO_INCREMENT,
numLote INT,
fkEstoque INT,
CONSTRAINT fkEstoqueLote
FOREIGN KEY (fkEstoque) REFERENCES estoque(idEstoque),
fkProduto INT,
CONSTRAINT fkProdutoLote
FOREIGN KEY (fkProduto) REFERENCES produto(idProduto),
fkSensor INT,
CONSTRAINT fkSensorLote
FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
dtEntrada DATETIME,
dtSaida DATETIME,
PRIMARY KEY(idLote, fkEstoque, fkProduto)
);


alter table produto add column fkLote int;
alter table produto add constraint fkLoteProduro foreign key (fkLote) references lote (idLote);
