// Importa o mongoose para definição de schema e modelo
const mongoose = require("mongoose");

// Cria a estrutura (schema) para o documento de usuário
const maquinachema = new mongoose.Schema({
  nome: { type: String, required: true },  // Campo "nome", obrigatório e do tipo String
  tipo: { type: String, required: true },  // Campo "tipo", obrigatório e do tipo String
  status: { type: String, required: true }, 
  ultimaManutencao: { type: Date, required: true } 

});

// Exporta o modelo "maquina", que será usado nas rotas CRUD
module.exports = mongoose.model("maquina", maquinachema);
