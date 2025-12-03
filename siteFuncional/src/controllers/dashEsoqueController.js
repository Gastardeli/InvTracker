const dashDiariaModel = require("../models/estoqueDashModel");

function graficoDoisEstadoCritico(req, res) {
    const idEstoque = req.params.idEstoque;
    dashDiariaModel.graficoDoisEstadoCritico(idEstoque).then(function (resultado) {
        res.status(200).json({ graficoEstoque: resultado });
    }).catch(function (erro) {
        console.error("Erro no controller:", erro); // ← adicione isso para debug
        res.status(500).json({ error: erro.sqlMessage || erro.message });
    });
}

function graficoOcupacaoLotes(req, res) {
    const idEstoque = req.params.idEstoque;
    dashDiariaModel.graficoOcupacaoLotes(idEstoque).then(function (resultado) {
        res.status(200).json({ graficoEstoque: resultado });
    }).catch(function (erro) {
        console.error("Erro no controller:", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message });
    });
}

module.exports = {
    graficoDoisEstadoCritico,
    graficoOcupacaoLotes
};