import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Computer Parts Shop API',
      version: '1.0.0',
      description: 'This is a backend API for an online shop that sells computer parts and many more!.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts', 'src/entities/*.ts'], // Adjust to your actual file structure
};

export const swaggerSpec = swaggerJSDoc(options);