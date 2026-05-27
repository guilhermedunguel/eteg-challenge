import z from "zod";
import {
  Client,
  ClientDTO,
  ClientsRepository,
  IClientsRepository,
} from "../repositories/clients-repository";

export const clientSchema = z.object({
  name: z.string().min(1).max(255),
  cpf: z.string().length(11),
  email: z.email().max(255),
  favoriteColorId: z.number(),
  observations: z.string().max(1000).optional(),
});

export class ClientsService {
  constructor(private repository: IClientsRepository) {}

  async list({ page, limit }: { page: number; limit: number }) {
    return await this.repository.findAll({ page, limit });
  }

  async create(client: ClientDTO) {
    const parsedClient = z.safeParse(clientSchema, client);

    if (!parsedClient.success) {
      throw new Error(
        JSON.stringify(z.flattenError(parsedClient.error).fieldErrors),
      );
    }

    const clientByCpf = await this.repository.findByCpf({ cpf: client.cpf });

    if (clientByCpf) {
      throw new Error("CPF already exists");
    }

    return await this.repository.insert(parsedClient.data);
  }

  async remove({ id }: Pick<Client, "id">) {
    const client = await this.repository.findById({ id });

    if (!client) {
      throw new Error("Client not found");
    }

    return await this.repository.remove({ id });
  }
}
