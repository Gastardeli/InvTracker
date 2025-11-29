var database = require("../database/config");

function estoqueFunction() {
  var instrucaoSql = `SELECT * FROM viewEstoque`; // Mudar com base  no view do kadooca

  return database.executar(instrucaoSql);
}

module.exports = { 
    estoqueFunction};
