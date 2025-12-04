const dashDiariaModel = require("../models/estoqueDashModel");

function graficoDoisEstadoCritico(idEstoque, idEmpresa, res) {

    dashDiariaModel.graficoDoisEstadoCritico(idEstoque, idEmpresa).then(function (resultado) {
        res.status(200).json({ graficoEstoque: resultado });
    }).catch(function (erro) {
        console.error("Erro no controller:", erro); // ← adicione isso para debug
        res.status(500).json({ error: erro.sqlMessage || erro.message });
    });
}

function graficoOcupacaoLotes(idEstoque, idEmpresa, res) {
    dashDiariaModel.graficoOcupacaoLotes(idEstoque, idEmpresa).then(function (resultado) {
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