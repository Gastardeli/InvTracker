var dashDiariaModel = require("../models/dashDiariaModel");


function dashEstoquelistar(req, res) {
    dashDiariaModel.dashEstoquelistar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    dashEstoquelistar
}
