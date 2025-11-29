var express = require("express")
var router = express.Router();

var cadastroProdutoController = require("../controllers/estoqueController");

router.post("/cadastrarProduto",function(req, res){
    cadastroProdutoController.cadastrarProduto(req, res);
})

module.exports = router; 




