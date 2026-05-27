import { eq } from "drizzle-orm";
import { Database } from "../database";
import { clientsTable } from "../database/schema";

export type ClientDTO = typeof clientsTable.$inferInsert;
export type Client = typeof clientsTable.$inferSelect;

export class ClientsRepository {
  constructor(private database: Database) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    return this.database
      .select()
      .from(clientsTable)
      .limit(limit)
      .offset((page - 1) * limit);
  }

  async findById({ id }: Pick<Client, "id">) {
    const result = await this.database
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.id, id));

    return result;
  }

  async findByCpf({ cpf }: Pick<Client, "cpf">) {
    const result = await this.database
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.cpf, cpf));

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
