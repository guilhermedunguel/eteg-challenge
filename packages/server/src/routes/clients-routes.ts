import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { clientSchema, ClientsService } from "../services/clients-service";
import z from "zod";
import { ClientsRepository } from "../repositories/clients-repository";
import { db } from "../database";
import { ConflictError } from "../errors";

export const clientsRoutes: FastifyPluginAsyncZod = async (app) => {
  const clientsRepository = new ClientsRepository(db);
  const clientsService = new ClientsService(clientsRepository);

  app.post(
    "/",
    {
      schema: {
        tags: ["client"],
        description: "Create a new client.",
        body: clientSchema,
        response: {
          201: z.object({
            id: z.number(),
          }),
          409: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await clientsService.create(request.body);
        return reply.status(201).send({
          id: result.id,
        });
      } catch (error) {
        if (error instanceof ConflictError) {
          return reply.status(409).send({ message: error.message });
        }
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
      }
    },
  );
};
