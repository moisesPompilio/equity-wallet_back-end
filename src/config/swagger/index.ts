import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.API_PORT;
const urlAPI = `http://localhost:${PORT}`

const DOCKER_PORT = process.env.DOCKER_PORT;
const urlDOCKER = `http://localhost:${DOCKER_PORT}`

export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Equity-Wallet',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express, TypeORM, Swagger, Bcrypt, Json Web Token, PostgreSQL, UUID, Jest and Supertest. It allows the registration of information about expenses and earnings, as well as categorizing and dating this information.',
      license: {
        name: 'Repository-GitHub',
        url: 'https://github.com/moisesPompilio/equity-wallet_back-end',
      },
      contact: {
        name: 'Developer Website ',
        url: 'https://keen-fairy-002944.netlify.app'
      },
    },
    servers: [
      {
        url: urlDOCKER,
        description: 'Development server DOCKER',
      },
      {
        url: urlAPI,
        description: 'Development server',
      },
    ],
  };

  export const Options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/*.ts', './src/entities/*.ts'],
};