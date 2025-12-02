var express = require("express");
var router = express.Router();

var dashDiariaController = require("../controllers/dashDiariaController");

router.get("/kpiProdutoVencido/:idEmpresa", function (req, res) {

    dashDiariaController.kpiProdutoVencido(req, res);
});

router.delete("/deletarRegistro/:idEmpresa", function (req, res) {

    dashDiariaController.deletarRegistro(req, res);
});

module.exports = router;