const fs = require("fs");
const csv = require("csv-parser");

const boletosRepository = require("../repository");
const prisma = require("../../../database");

async function importarBoletos(filePath) {
  const boletos = [];

  try {
    const stream = fs.createReadStream(filePath);
    const parser = stream.pipe(csv({ separator: ";" }));

    for await (const data of parser) {
      const { nome, valor, linha_digitavel } = data;

      boletos.push({
        nome_sacado: nome,
        id_lote: null,
        valor: parseFloat(valor),
        linha_digitavel,
        ativo: true,
      });
    }

    const lotes = await prisma.lotes.findMany();
    const loteMap = {};

    lotes.forEach((lote) => {
      const loteFormatted = lote.nome.padStart(4, "0");
      loteMap[loteFormatted] = lote.id;
    });

    for (const boleto of boletos) {
      const loteFormatted = boleto.id_lote.padStart(4, "0");
      const idLote = loteMap[loteFormatted];

      if (idLote) {
        boleto.id_lote = idLote;
        await boletosRepository.createBoleto(boleto);
      }
    }

    fs.unlinkSync(filePath);
  } catch (error) {
    throw error;
  }
}

module.exports = { importarBoletos };
