export const dbConfig = {
  DATABASE_CONNECTION_STRING:
    process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost:27017',
  DATABASE_NAME: process.env.DATABASE_NAME || 'app',
};
