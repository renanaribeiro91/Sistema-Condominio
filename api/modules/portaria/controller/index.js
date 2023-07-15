const boletosService = require("../services");

async function importarPDF(req, res) {
  const { path: filePath } = req.file;

  try {
    await boletosService.importarPDF(filePath);
    res.status(200).json({ message: "PDF importado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao importar PDF." });
  }
}

module.exports = { importarPDF };
