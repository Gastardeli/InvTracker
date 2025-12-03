var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/dashEsoqueController");


router.get("/graficoDoisEstadoCritico/:idEstoque", function (req, res) {
  estoqueController.graficoDoisEstadoCritico(req, res);
})
router.get("/graficoOcupacaoLotes/:idEstoque", function (req, res) {
  estoqueController.graficoOcupacaoLotes(req, res);
})



module.exports = router;
