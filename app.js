const express = require("express");
const financeiroRoutes = require("./api/modules/financeiro/routes");
const portariaRoutes = require("./api/modules/portaria/routes");

const app = express();

app.use("/api/financeiro/boletos", financeiroRoutes);
app.use("/api/portaria/boletos", portariaRoutes);

module.exports = app;
