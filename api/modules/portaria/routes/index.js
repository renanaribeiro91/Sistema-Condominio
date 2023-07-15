const express = require("express");
const multer = require("multer");
const { importarPDF } = require("../controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/importar", upload.single("file"), importarPDF);

module.exports = router;
