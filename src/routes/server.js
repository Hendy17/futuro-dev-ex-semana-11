const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection');
const { Server } = require('./server'); // Importando a classe Server do arquivo server.js em minúsculas
// Importando a classe Server do arquivo Server.js
const professoresRouter = require('./routes/Professores'); // Importando as rotas dos professores

const PORT_API = process.env.PORT_API || 3000; // Definindo a porta padrão para 3000 caso não seja definida

class MyServer extends Server {
  constructor(server = express()) {
    super(server); // Chamando o construtor da classe pai (Server)

    this.middlewares(server);
    this.database();
    this.initializeRoutes(server); // Adicionando a inicialização das rotas
    this.initializeServer(server);
  }

  initializeRoutes(app) {
    app.use('/api', professoresRouter); // Definindo o prefixo '/api' para as rotas dos professores
  }

  async middlewares(app) {
    super.middlewares(app); // Chamando os middlewares da classe pai
    app.use(cors());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
      console.error('Não foi possível conectar ao banco de dados:', error);
      throw error;
    }
  }
}

// Criando uma instância do servidor
const myServer = new MyServer();

// Exportando a instância do servidor (opcional)
module.exports = myServer;
