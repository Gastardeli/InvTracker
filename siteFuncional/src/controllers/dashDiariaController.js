var dashDiariaModel = require("../models/dashDiariaModel");

function kpiQtdLotesReposicao(req, res) {
    var idEmpresa = req.params.idEmpresa;
    dashDiariaModel.kpiQtdLotesReposicao(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
function kpiProdutoVencido(req, res) {
    var idEmpresa = req.params.idEmpresa;
    dashDiariaModel.kpiProdutoVencido(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}
function kpiEstoqueVazio(req, res) {
    dashDiariaModel.kpiEstoqueVazio().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function deletarRegistro(req, res) {
    var idEmpresa = req.params.idEmpresa;
    dashDiariaModel.deletarRegistro(idEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function graficoLotesDefasados(req, res) {
    const idEmpresa = req.params.idEmpresa;

    dashDiariaModel.graficoLotesDefasados(idEmpresa)
        .then(resultado => {
            res.status(200).json({ lista: resultado });
        })
        .catch(erro => {
            res.status(500).json(erro.sqlMessage);
        });
}



module.exports = {
    kpiEstoqueVazio,
    kpiQtdLotesReposicao,
    kpiProdutoVencido,
    deletarRegistro,
    graficoLotesDefasados
}
