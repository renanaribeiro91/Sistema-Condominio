const prisma = require("../../../database");

async function createBoleto(boletoData) {
  return prisma.boletos.create({ data: boletoData });
}

module.exports = { createBoleto };
