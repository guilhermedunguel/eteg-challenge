import { eq } from "drizzle-orm";
import { Database } from "../database";
import { clientsTable } from "../database/schema";

export type ClientDTO = typeof clientsTable.$inferInsert;
export type Client = typeof clientsTable.$inferSelect;

export interface IClientsRepository {
  findByCpf({ cpf }: Pick<Client, "cpf">): Promise<Client | null>;
  insert(client: ClientDTO): Promise<{ id: number }>;
}

export class ClientsRepository implements IClientsRepository {
  constructor(private database: Database) {}

  async findByCpf({ cpf }: Pick<Client, "cpf">) {
    const [result] = await this.database
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.cpf, cpf))
      .limit(1);

    return result;
  }

  async insert(client: ClientDTO) {
    const [result] = await this.database
      .insert(clientsTable)
      .values(client)
      .returning({ id: clientsTable.id });

    return result;
  }
}
