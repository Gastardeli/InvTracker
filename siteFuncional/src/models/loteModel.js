

var database = require("../database/config");


function cadastrarLote(fkProduto, fkEstoque,) {

    var instrucao = `
        INSERT INTO lote (fkProduto, fkEstoque, fkSensor, dtEntrada, dtSaida)
        VALUES (
            ${fkProduto},
            ${fkEstoque},
            null,
            NOW(),
            null
        );
    `;

    return database.executar(instrucao);
}
module.exports = { cadastrarLote };