import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { ColorsRepository } from "../repositories/colors-repository";
import { ColorsService } from "../services/colors-service";
import { db } from "../database";
import z from "zod";

export const colorsRoutes: FastifyPluginAsyncZod = async (app) => {
  const colorsRepository = new ColorsRepository(db);
  const colorsService = new ColorsService(colorsRepository);

  app.get(
    "/",
    {
      schema: {
        tags: ["colors"],
        description: "List all available colors.",
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              hex: z.string(),
            }),
          ),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      try {
        const colors = await colorsService.list();
        return reply.status(200).send(colors);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
      }
    },
  );
};
