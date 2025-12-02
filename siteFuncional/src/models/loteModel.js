

var database = require("../database/config");


function cadastrarLote(idLote, fkProduto, fkEstoque, fkEmpresa) {

    var instrucao = `
        INSERT INTO lote (idLote, fkProduto, fkEmpresa, fkEstoque, fkSensor, dtEntrada, dtSaida)
        VALUES (
            ${idLote},
            ${fkProduto},
            ${fkEmpresa},
            ${fkEstoque},
            null,
            NOW(),
            null
        );
    `;

    return database.executar(instrucao);
}
module.exports = { cadastrarLote };