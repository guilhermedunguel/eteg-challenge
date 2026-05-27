import { eq } from "drizzle-orm";
import { Database } from "../database";
import { clientsTable } from "../database/schema";

export type ClientDTO = typeof clientsTable.$inferInsert;
export type Client = typeof clientsTable.$inferSelect;

export interface IClientsRepository {
  findByCpf({ cpf }: Pick<Client, "cpf">): Promise<Client | null>;
  findById({ id }: Pick<Client, "id">): Promise<Client | null>;
  findAll({ page, limit }: { page: number; limit: number }): Promise<Client[]>;
  insert(client: ClientDTO): Promise<{ id: number }[]>;
  remove({ id }: Pick<Client, "id">): Promise<number | null>;
}

export class ClientsRepository implements IClientsRepository {
  constructor(private database: Database) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    return this.database
      .select()
      .from(clientsTable)
      .limit(limit)
      .offset((page - 1) * limit);
  }

  async findById({ id }: Pick<Client, "id">) {
    const [result] = await this.database
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.id, id))
      .limit(1);

    return result;
  }

  async findByCpf({ cpf }: Pick<Client, "cpf">) {
    const [result] = await this.database
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.cpf, cpf))
      .limit(1);

    return result;
  }

  async insert(client: ClientDTO) {
    const result = await this.database
      .insert(clientsTable)
      .values(client)
      .returning({ id: clientsTable.id });

    return result;
  }

  async remove({ id }: Pick<Client, "id">) {
    const result = await this.database
      .delete(clientsTable)
      .where(eq(clientsTable.id, id));

    return result.rowCount;
  }
}
