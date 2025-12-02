const dashDiariaModel = require("../models/estoqueDashModel");

function graficoDoisEstadoCritico(req, res) {
    dashDiariaModel.graficoDoisEstadoCritico().then(function(resultado){
        res.status(200).json({ graficoPersonagens: resultado });
    }).catch(function(erro){
        console.error("Erro no controller:", erro); // ← adicione isso para debug
        res.status(500).json({ error: erro.sqlMessage || erro.message });
    });
}

function graficoOcupacaoLotes(req, res) {
    dashDiariaModel.graficoOcupacaoLotes().then(function(resultado){
        res.status(200).json({ graficoPersonagens: resultado });
    }).catch(function(erro){
        console.error("Erro no controller:", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message });
    });
}

module.exports = {
    graficoDoisEstadoCritico,
    graficoOcupacaoLotes
};