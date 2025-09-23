// Importa as bibliotecas necessárias
const express = require("express");    // Framework para criar servidor HTTP
const mongoose = require("mongoose");  // Biblioteca para conectar ao MongoDB
const Usuario = require("./models/Usuario"); // Modelo do banco (Schema de Usuário)

// Cria a aplicação Express
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Middleware que permite interpretar JSON no corpo das requisições
app.use(express.json());

// ==================== CONEXÃO COM O MONGODB LOCAL ====================
// Conecta no banco local "crudDB" (MongoDB Compass local)
mongoose.connect("mongodb://localhost:27017/crudDB", {
  useNewUrlParser: true,      // Usa o novo parser de URL
  useUnifiedTopology: true    // Usa o novo mecanismo de monitoramento de conexões
}).then(() => console.log("✅ Conectado ao MongoDB local")) // Sucesso na conexão
  .catch(err => console.error("❌ Erro ao conectar:", err)); // Erro na conexão

// ==================== ROTAS CRUD ====================

// CREATE → cria novo usuário
app.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;                      // Pega os dados do corpo da requisição
  const novoUsuario = await Usuario.create({ nome, email }); // Cria e salva no MongoDB
  res.status(201).json(novoUsuario);                     // Retorna status 201 + usuário criado
});

// READ ALL → lista todos os usuários
app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find();                 // Busca todos os documentos
  res.json(usuarios);                                    // Retorna em JSON
});

// READ ONE → busca usuário pelo ID
app.get("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findById(req.params.id); // Procura pelo ID passado na URL
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" }); // Se não achou, 404
  res.json(usuario);                                     // Retorna usuário encontrado
});

// UPDATE → atualiza usuário pelo ID
app.put("/usuarios/:id", async (req, res) => {
  const { nome, email } = req.body;                      // Novos dados enviados
  const usuario = await Usuario.findByIdAndUpdate(       // Procura e atualiza
    req.params.id,                                       // ID do usuário
    { nome, email },                                     // Dados a serem atualizados
    { new: true }                                        // Retorna já atualizado
  );
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" }); // Se não achou, 404
  res.json(usuario);                                     // Retorna usuário atualizado
});

// DELETE → remove usuário pelo ID
app.delete("/usuarios/:id", async (req, res) => {
  const usuario = await Usuario.findByIdAndDelete(req.params.id); // Procura e deleta
  if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" }); // Se não achou, 404
  res.json({ mensagem: "Usuário deletado com sucesso" }); // Confirma exclusão
});

// ==================== INICIAR SERVIDOR ====================
// Sobe o servidor na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
