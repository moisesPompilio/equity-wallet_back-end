import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.API_PORT;
const urlAPI = `http://localhost:${PORT}`

const DOCKER_PORT = process.env.DOCKER_PORT;
const urlDOCKER = `http://localhost:${DOCKER_PORT}`

export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
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