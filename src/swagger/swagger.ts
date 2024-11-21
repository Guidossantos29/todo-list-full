import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas",
      version: "1.0.0",
      description: "Documentação da API de gerenciamento de tarefas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://todo-list-full-production.up.railway.app/"
      }
    ],
  },
  apis: ["./src/index.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
