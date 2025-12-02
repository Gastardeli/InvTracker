var dashDiariaModel = require("../models/dashDiariaModel");

function kpiQtdLotesReposicao(req, res) {
    dashDiariaModel.kpiQtdLotesReposicao().then(function (resultado) {
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
function kpiProdutoVencido(req, res) {
    dashDiariaModel.kpiProdutoVencido().then(function (resultado) {
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
function kpiEstoqueVazio(req, res) {
    dashDiariaModel.kpiEstoqueVazio().then(function (resultado) {
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    kpiEstoqueVazio,
    kpiQtdLotesReposicao,
    kpiProdutoVencido
}
