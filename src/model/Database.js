import { MongoClient } from 'mongodb';
import { dbConfig } from '../config/database.js';

export class Database {
  static db;

  static connect = async () => {
    try {
      const client = new MongoClient(dbConfig.DATABASE_CONNECTION_STRING);

      await client.connect();

      console.log('Conexión exitosa a base de datos');

      this.db = client.db(dbConfig.DATABASE_NAME);
    } catch (error) {
      console.log(`Error en la conexión de base de datos: ${error.message}`);
    }
  };

  static disconnect = async () => {
    try {
      await this.db.client.close();
    } catch (error) {
      console.log(`Error en la desconexión de base de datos: ${error.message}`);
    }
  };
}
