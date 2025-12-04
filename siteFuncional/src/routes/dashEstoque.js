var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/dashEsoqueController");


router.get("/graficoDoisEstadoCritico/:idEstoque/:idEmpresa", function (req, res) {

  const idEstoque = req.params.idEstoque;
  const idEmpresa = req.params.idEmpresa;

  estoqueController.graficoDoisEstadoCritico(idEstoque, idEmpresa, res);
})

router.get("/graficoOcupacaoLotes/:idEstoque/:idEmpresa", function (req, res) {

  const idEstoque = req.params.idEstoque;
  const idEmpresa = req.params.idEmpresa;

  estoqueController.graficoOcupacaoLotes(idEstoque, idEmpresa, res);
})

router.get("/loteComMaiorNecessidade/:idEmpresa", function (req, res) {
  estoqueController.loteComMaiorNecessidade(req, res);
})

router.get("/qtdeLotesReabastecimento/:idEmpresa", function (req, res) {
  estoqueController.qtdeLotesReabastecimento(req, res);
})

module.exports = router;
