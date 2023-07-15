const path = require("path");
const boletosService = require("../services");

async function importarBoletos(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
    }

    const arquivoCSV = req.files.arquivoCSV;

    if (arquivoCSV.mimetype !== "text/csv") {
      return res.status(400).json({ error: "O arquivo deve ser um CSV válido." });
    }

    const filePath = path.join(__dirname, "../../../uploads/", arquivoCSV.name);

    arquivoCSV.mv(filePath, async (error) => {
      if (error) {
        return res.status(500).json({ error: "Ocorreu um erro ao salvar o arquivo." });
      }

      try {
        await boletosService.importarBoletos(filePath);
        res.status(200).json({ message: "Boletos importados com sucesso." });
      } catch (error) {
        res.status(500).json({ error: "Ocorreu um erro ao importar os boletos." });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao importar os boletos." });
  }
}

module.exports = { importarBoletos };
