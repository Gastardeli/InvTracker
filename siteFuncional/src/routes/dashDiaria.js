var express = require("express");
var router = express.Router();

var dashDiariaController = require("../controllers/dashDiariaController");


router.get("/dashDiarialistar", function (req, res) {
    // função a ser chamada quando acessar /carros/dashDiarialistar
    dashDiariaController.dashDiarialistar(req, res);
});

module.exports = router;
