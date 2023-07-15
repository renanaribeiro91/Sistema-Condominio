const express = require("express");
const router = express.Router();
const financeiroController = require("../controller");
const fileUpload = require("express-fileupload");

// Rota para importar boletos
router.post("/importar-boletos", fileUpload(), financeiroController.importarBoletos);

module.exports = router;
