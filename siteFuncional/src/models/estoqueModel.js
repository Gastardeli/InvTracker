var database = require("../database/config");

function buscarEstoquePorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM funcionario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {

  var instrucaoSql = `INSERT INTO (estoque, fkEmpresa) estoque VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarEstoquePorEmpresa,
  cadastrar
}
