# CRUD com Node.js, Express e MongoDB (Compass Local) – Comentado

Este projeto implementa um CRUD de usuários em **Node.js + Express + MongoDB**, rodando localmente.

## Pré-requisitos

1. Instalar **Node.js** (versão LTS).  
2. Instalar **MongoDB Community Server** (banco local).  
3. Instalar **MongoDB Compass** (interface gráfica).  

## Como rodar
npm install express mongoose

4. Rode o servidor:
node index.js

5. Acesse em:
http://localhost:3000

## Rotas CRUD

- **POST** `/usuarios` → cria usuário.  
- **GET** `/usuarios` → lista todos.  
- **GET** `/usuarios/:id` → busca por ID.  
- **PUT** `/usuarios/:id` → atualiza por ID.  
- **DELETE** `/usuarios/:id` → deleta por ID.  

Criar usuário (POST)
Clique em New Request.
Escolha o método POST.
Digite a URL: http://localhost:3000/usuarios
Vá na aba Body → JSON e insira:

{
  "nome": "Tatiana",
  "email": "tatiana@email.com"
}


Clique em Send → o usuário será criado no banco.

📋 Listar todos os usuários (GET)

Clique em New Request.

Método GET.

URL:

http://localhost:3000/usuarios


Clique em Send → você verá a lista de usuários cadastrados.

🔍 Buscar usuário por ID (GET)

Copie o _id de algum usuário retornado na listagem.

Crie uma requisição GET com a URL:

http://localhost:3000/usuarios/COLOQUE_O_ID_AQUI

✏️ Atualizar usuário (PUT)

Crie uma requisição PUT.

URL:

http://localhost:3000/usuarios/COLOQUE_O_ID_AQUI


Body (JSON):

{
  "nome": "Novo Nome",
  "email": "novo@email.com"
}


Clique em Send → o usuário será atualizado.

❌ Deletar usuário (DELETE)

Crie uma requisição DELETE.

URL: http://localhost:3000/usuarios/COLOQUE_O_ID_AQUI


Clique em Send → o usuário será removido.
 O banco roda localmente no `mongodb://localhost:27017/crudDB`.  
Use o **Compass** para visualizar as mudanças em tempo real.
