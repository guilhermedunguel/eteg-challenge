import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export const app = fastify();

// Plugins
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Routes
app.get("/", (request, reply) => {
  reply.status(200).send("OK");
});
