const app = require("./app");

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
