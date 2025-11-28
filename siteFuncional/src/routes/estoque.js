var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/estoqueController");

router.get("/:empresaId", function (req, res) {
  estoqueController.buscarEstoquePorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  estoqueController.cadastrar(req, res);
})

module.exports = router;