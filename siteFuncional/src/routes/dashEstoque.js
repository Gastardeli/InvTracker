var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/estoqueDashController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/estoqueFunction", function (req, res) {
  estoqueController.estoqueFunction(req, res);
})

module.exports = router;

