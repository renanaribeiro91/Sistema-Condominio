const prisma = require("../../../database");

async function updateBoleto(id, data) {
  return prisma.boletos.update({ where: { id }, data });
}

module.exports = { updateBoleto };
