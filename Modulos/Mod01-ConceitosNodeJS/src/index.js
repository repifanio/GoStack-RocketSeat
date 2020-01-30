const express = require('express');

const server = express();
server.use(express.json());

const usuarios = ['Rafael', 'david', 'Diego'];

//middlewares Global
server.use((request, response, next) => {
  console.time();
  console.log(`Metodo: ${request.method}. URL: ${request.url}.`);

  next();

  console.timeEnd();
});

//Middleware para verificar se a tag name existe
function checkNameOnRequest(request, response, next) {
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ message: "Tag name is required." });
  }

  next();
}

//Middleware para identificar se o parâmetro é válido
function checkHaveNameWithIndex(request, response, next) {
  const index = request.params.index;

  if (!usuarios[index]) {
    return response.status(400).json({ message: "User not found with this ID." });
  }

  request.usuario = usuarios[index];
  next();
}


//Listando todos os usuários
server.get('/users', (request, response) => {
  return response.json(usuarios);
});

//Listando um usuário
server.get('/users/:index', checkHaveNameWithIndex, (request, response) => {
  response.json(request.usuario);
});

//Inserindo um novo usuário
server.post('/users', checkNameOnRequest, (request, response) => {
  const { name } = request.body;

  usuarios.push(name);
  return response.json(usuarios);
})

//Editando um usuário
server.put('/users/:index', checkHaveNameWithIndex, checkNameOnRequest, (request, response) => {
  const { index } = request.params;
  const { name } = request.body;

  usuarios[index] = name;
  return response.json(usuarios);
})

//Deletando um usuário
server.delete('/users/:index', checkHaveNameWithIndex, (request, response) => {
  const { index } = request.params;

  usuarios.splice(index, 1);
  return response.send('Usuário removido com sucesso.');
})



server.listen(3000);