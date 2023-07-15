const fs = require("fs");
const pdfParse = require("pdf-parse");
const boletosRepository = require("../repository");

async function importarPDF(filePath) {
  const pdfData = await pdfParse(fs.readFileSync(filePath));

  const boletos = await prisma.boletos.findMany();

  const pages = pdfData.text.split("PAGINA BOLETO");

  for (let i = 1; i < pages.length; i++) {
    const page = pages[i].trim();
    const nome = page.split("\n")[0].trim();

    const boleto = boletos.find(
      (b) => b.nome_sacado.toLowerCase() === nome.toLowerCase()
    );

    if (boleto) {
      const pdfPath = `${__dirname}/../../../boletos/${boleto.id}.pdf`;

      fs.writeFileSync(pdfPath, page);

      // Atualizar o boleto no banco de dados com o caminho do PDF
      await boletosRepository.updateBoleto(boleto.id, { pdf_path: pdfPath });
    }
  }

  fs.unlinkSync(filePath);
}

module.exports = { importarPDF };
