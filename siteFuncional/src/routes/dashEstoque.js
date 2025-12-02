var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/dashEsoqueController"); 


router.get("/graficoDoisEstadoCritico", function (req, res) {
  estoqueController.graficoDoisEstadoCritico(req, res); 
})
router.get("/graficoOcupacaoLotes", function (req, res) {
  estoqueController.graficoOcupacaoLotes(req, res); 
})


module.exports = router;
