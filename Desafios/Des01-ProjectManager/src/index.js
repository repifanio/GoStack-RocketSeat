const express = require('express');
const routes = require('./routes');

let contador = 0;

const app = express();
app.use(express.json());

app.use((request, Response, next) => {
  console.time();
  console.log(`Metodo: ${request.method}. URL: ${request.url}.`);

  next();

  contador++;

  console.timeEnd();
  console.log(`Essa é a ${contador}ª requisição na API até o momento.`);
});


app.use(routes);
app.listen(3001);
