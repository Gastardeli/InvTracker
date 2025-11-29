var express = require("express")
var router = express.Router();

var cadastroProdutoController = require("../controllers/cadastroProdutoController");

router.post("/cadastrarProduto",function(req, res){
    cadastroProdutoController.cadastrarProduto(req, res);
})

module.exports = router; 




