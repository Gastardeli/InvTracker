const produtoModel = require("../models/cadastroProdutoModel");
const loteModel = require("../models/loteModel");


function cadastrarProduto(req, res) {

    var fkEstoque = req.body.estoqueServer;
    var nome = req.body.produtoServer;
    var fab = req.body.dataFabServer;
    var val = req.body.dataValServer;
    var fabricante = req.body.fabricanteServer;
    var compra = req.body.valorCompraServer;
    var venda = req.body.valorVendaServer;
    var idLote = req.body.loteServer;
    var fkEmpresa = req.body.fkEmpresaServer;


    produtoModel.cadastrarProduto(nome, fab, val, fabricante, compra, venda)
        .then(resultado => {

            const idProduto = resultado.insertId;

            return loteModel.cadastrarLote(idLote, idProduto, fkEmpresa, fkEstoque);
        })
        .then(() => {
            res.json({ msg: "Produto + Lote cadastrados com sucesso!" });
        })
        .catch(erro => {
            console.log("ERRO:", erro);
            res.status(500).json(erro);
        });
}

module.exports = { cadastrarProduto };
