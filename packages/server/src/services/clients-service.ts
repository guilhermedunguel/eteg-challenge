import z from "zod";
import {
  ClientDTO,
  IClientsRepository,
} from "../repositories/clients-repository";
import { ConflictError, ValidationError } from "../errors";

export const clientSchema = z.object({
  name: z.string().min(1).max(255),
  cpf: z.string().length(11),
  email: z.email().max(255),
  favoriteColorId: z.number(),
  observations: z.string().max(1000).optional(),
});

export class ClientsService {
  constructor(private repository: IClientsRepository) {}

  async create(client: ClientDTO) {
    const parsedClient = z.safeParse(clientSchema, client);

    if (!parsedClient.success) {
      throw new ValidationError(
        JSON.stringify(z.flattenError(parsedClient.error).fieldErrors),
      );
    }

    const clientByCpf = await this.repository.findByCpf({ cpf: client.cpf });

    if (clientByCpf) {
      throw new ConflictError("CPF already exists");
    }

    const clientByEmail = await this.repository.findByEmail({
      email: client.email,
    });

    if (clientByEmail) {
      throw new ConflictError("Email already exists");
    }

    return await this.repository.insert(parsedClient.data);
  }
}
