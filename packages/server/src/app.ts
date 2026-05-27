import { fastify } from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import fastifyScalar from "@scalar/fastify-api-reference";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { clientsRoutes } from "./routes/clients-routes";
import { env } from "../env";

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

// Routes
app.register(
  async (api) => {
    api.register(clientsRoutes, { prefix: "/clients" });
  },
  { prefix: "/v1" },
);
