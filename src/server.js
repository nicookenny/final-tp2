import express from 'express';
import { serverConfig } from './config/server.js';
import { Database } from './model/Database.js';
import { SensorRouter } from './router/sensor.router.js';

class Server {
  constructor() {
    this.app = express();
  }

  async applyPersistance() {
    await Database.connect();
  }

  applyMiddlewares() {
    this.app.use(express.json());
  }

  applyRoutes() {
    this.app.use('/sensores', new SensorRouter().initialize());
  }

  listen() {
    const { PORT } = serverConfig;

    this.app.on('error', (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );

    this.app.listen(PORT, () =>
      console.log(`API levantada en http://localhost:${PORT}`)
    );
  }

  async start() {
    await this.applyPersistance();
    this.applyMiddlewares();
    this.applyRoutes();
    this.listen();
  }
}

export default Server;
