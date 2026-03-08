import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express TypeScript API with Swagger',
      version: '1.0.0',
      description: 'API documentation using swagger-jsdoc and swagger-ui-express',
    },
  },
  apis: [
    './index.ts',    
    './routes/*.ts',    
    './controllers/*.ts' 
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
