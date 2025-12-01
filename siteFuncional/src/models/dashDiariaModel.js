var database = require("../database/config")

function dashDiarialistar() {
    var instrucao = `
        SELECT * FROM VW_DashboardDiaria;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    dashDiarialistar
};