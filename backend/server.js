// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.get("/api/data", (req, res) => {
  res.json({ mensaje: "Datos desde el backend" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
