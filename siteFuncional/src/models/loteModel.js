

var database = require("../database/config");


function cadastrarLote(idLote, fkProduto, fkEstoque, fkEmpresa) {

    var instrucao = `
    UPDATE lote
    SET 
    fkProduto = ${fkProduto},
    dtEntrada = NOW()
    WHERE 
    idLote = ${idLote} AND 
    fkEmpresa = ${fkEmpresa} AND 
    fkEstoque = ${fkEstoque};
    `;

    return database.executar(instrucao);
}
module.exports = { cadastrarLote };