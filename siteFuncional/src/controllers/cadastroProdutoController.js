var cadastroProdutoModel = require("../models/cadastroProdutoModel");


function cadastrarProduto(req, res) {


    var  fkEstoque = req.body.estoqueServer;
    var fkLote = req.body.loteServer;
    var nomeProduto = req.body.produtoServer;
    var dtFabricacao = req.body.dataFabServer;
    var dtValidade = req.body.dataValServer;
    var fabricante = req.body.fabricanteServer;
    var valorCompra = req.body.valorCompraServer;
    var valorVenda = req.body.valorVendaServer;



    // Faça as validações dos valores
    if (fkEstoque == undefined) {
        res.status(400).send(" Estoque está undefined!");
    } else if (fkLote == undefined) {
        res.status(400).send("Lote está undefined!");
    } else if (nomeProduto == undefined) {
        res.status(400).send("Produto está undefined!");
    } else if (dtFabricacao == undefined) {
        res.status(400).send("data de fabricação está undefined!");
    } else if (dtValidade == undefined) {
        res.status(400).send("data de validade está undefined!");
    }else if (fabricante == undefined) {
        res.status(400).send("Fabricante está undefined!")
    } else if (valorCompra == undefined){
         res.status(400).send("valor compra está undefined!")
    }else if(valorVenda == undefined){
         res.status(400).send("valor venda está undefined!")
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cadastroProdutoModel.cadastrarProduto(fkEstoque, fkLote, nomeProduto, dtFabricação, dtValidade, fabricante, valorCompra, valorVenda) // colocar os dados 
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do produto! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {cadastrar};



