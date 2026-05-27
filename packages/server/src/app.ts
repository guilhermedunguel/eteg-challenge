import { fastify } from "fastify";
import cors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifyScalar from "@scalar/fastify-api-reference";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { clientsRoutes } from "./routes/clients-routes";
import { env } from "../env";
import { colorsRoutes } from "./routes/colors-routes";

export const app = fastify({
  logger:
    env.NODE_ENV === "development"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        }
      : false,
});

// Plugins
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "ETEG Challenge API",
      description:
        "API Criada para o desafio da ETEG, nela é possível cadastrar clientes e atribuir cores.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifyScalar, {
  routePrefix: "/docs",
});

app.register(cors, {
  // Deixei o Cors aberto, ao colocar em produção seria ideal configurar adequadamente.
  origin: true,
});

// Routes
app.register(
  async (api) => {
    api.register(clientsRoutes, { prefix: "/clients" });
    api.register(colorsRoutes, { prefix: "/colors" });
  },
  { prefix: "/v1" },
);
