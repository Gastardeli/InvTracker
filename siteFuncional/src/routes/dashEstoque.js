var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/estoqueController"); 


router.get("/dashEstoquelistar", function (req, res) {
  estoqueController.dashEstoquelistar(req, res); 
})

module.exports = router;
