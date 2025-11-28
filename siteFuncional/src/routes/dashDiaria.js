var express = require("express");
var router = express.Router();

var dashDiariaController = require("../controllers/dashDiariaController");


router.get("/listar", function (req, res) {
    // função a ser chamada quando acessar /carros/listar
    dashDiariaController.listar(req, res);
});

module.exports = router;
