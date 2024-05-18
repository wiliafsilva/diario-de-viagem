// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/travelDiary", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB:"));
db.once("open", () => {
  console.log("Conectado ao MongoDB.");
});

// Modelo do Registro de Viagem
const travelSchema = new mongoose.Schema({
  location: String,
  date: Date,
  description: String,
  image: String,
});
const Travel = mongoose.model("Travel", travelSchema);

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Rota para enviar registro de viagem
app.post("/api/travel", upload.single("image"), async (req, res) => {
  const { location, date, description } = req.body;
  const image = req.file.filename;

  try {
    const newTravel = new Travel({
      location,
      date,
      description,
      image,
    });
    await newTravel.save();
    res.status(201).send("Registro de viagem enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar registro de viagem:", error);
    res.status(500).send("Erro ao enviar registro de viagem.");
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
