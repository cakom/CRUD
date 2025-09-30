// Importa as bibliotecas necessárias
const express = require("express");    // Framework para criar servidor HTTP
const mongoose = require("mongoose");  // Biblioteca para conectar ao MongoDB
const maquina = require("./models/maquina"); // Modelo do banco (Schema de Usuário)

// Cria a aplicação Express
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 4000;

// Middleware que permite interpretar JSON no corpo das requisições
app.use(express.json());

// ==================== CONEXÃO COM O MONGODB LOCAL ====================
// Conecta no banco local "crudDB" (MongoDB Compass local)
mongoose.connect("mongodb://localhost:27017/crudmaquina", {
  useNewUrlParser: true,      // Usa o novo parser de URL
  useUnifiedTopology: true    // Usa o novo mecanismo de monitoramento de conexões
}).then(() => console.log("✅ Conectado ao MongoDB local")) // Sucesso na conexão
  .catch(err => console.error("❌ Erro ao conectar:", err)); // Erro na conexão

// ==================== ROTAS CRUD ====================

// CREATE → cria novo usuário
app.post("/maquina", async (req, res) => {
  const { nome, tipo, status, ultimaManutencao } = req.body;                      // Pega os dados do corpo da requisição
  const novomaquina = await maquina.create({ nome, tipo, status, ultimaManutencao }); // Cria e salva no MongoDB
  res.status(201).json(novomaquina);                     // Retorna status 201 + usuário criado
});

// READ ALL → lista todos os usuários
app.get("/maquina", async (req, res) => {
  const maquina2 = await maquina.find();                 // Busca todos os documentos
  res.json(maquina2);                                    // Retorna em JSON
});

// READ ONE → busca usuário pelo ID
app.get("/maquina/:id", async (req, res) => {
  const maquina3 = await maquina.findById(req.params.id); // Procura pelo ID passado na URL
  if (!maquina3) return res.status(404).json({ mensagem: "Usuário não encontrado" }); // Se não achou, 404
  res.json(maquina3);                                     // Retorna usuário encontrado
});

// UPDATE → atualiza usuário pelo ID
app.put("/maquina/:id", async (req, res) => {
  const { nome, tipo, status, ultimaManutencao } = req.body;                      // Novos dados enviados
  const maquina = await maquina.findByIdAndUpdate(       // Procura e atualiza
    req.params.id,                                       // ID do usuário
    { nome, tipo, status, ultimaManutencao },                                     // Dados a serem atualizados
    { new: true }                                        // Retorna já atualizado
  );
  if (!maquina) return res.status(404).json({ mensagem: "Usuário não encontrado" }); // Se não achou, 404
  res.json(maquina);                                     // Retorna usuário atualizado
});

// DELETE → remove usuário pelo ID
app.delete("/maquina/:id", async (req, res) => {
  const maquina = await maquina.findByIdAndDelete(req.params.id); // Procura e deleta
  if (!maquina) return res.status(404).json({ mensagem: "Usuário não encontrado" }); // Se não achou, 404
  res.json({ mensagem: "Usuário deletado com sucesso" }); // Confirma exclusão
});

// ==================== INICIAR SERVIDOR ====================
// Sobe o servidor na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});