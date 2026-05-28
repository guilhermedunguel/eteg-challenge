import { fastify, FastifyError } from "fastify";
import cors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifyScalar from "@scalar/fastify-api-reference";
import { AppError } from "./errors";
import z, { ZodError } from "zod";
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
  origin:
    env.NODE_ENV === "development"
      ? [/^http:\/\/localhost:\d+$/]
      : env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim()),
});

app.setErrorHandler((error: FastifyError, request, reply) => {
  if (error instanceof AppError) {
    return reply
      .status(error.statusCode)
      .send({ code: error.code, message: error.message });
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      code: "VALIDATION_ERROR",
      message: "Validation error",
      issues: z.flattenError(error).fieldErrors,
    });
  }

  if (error.statusCode && error.statusCode < 500) {
    return reply.status(error.statusCode).send({
      code: error.code ?? "BAD_REQUEST",
      message: error.message,
    });
  }

  request.log.error(error);
  return reply.status(500).send({
    code: "INTERNAL_ERROR",
    message: "Internal server error",
  });
});

// Routes
app.get("/", () => ({
  service: "ETEG Challenge API",
  version: "1.0.0",
  docs: "/docs",
}));

app.register(
  async (api) => {
    api.register(clientsRoutes, { prefix: "/clients" });
    api.register(colorsRoutes, { prefix: "/colors" });
  },
  { prefix: "/v1" },
);
