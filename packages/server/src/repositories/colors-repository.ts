import { Database } from "../database";
import { colorsTable } from "../database/schema";

export type Color = typeof colorsTable.$inferSelect;

export class ColorsRepository {
  constructor(private database: Database) {}

  async findAll(): Promise<Color[]> {
    return this.database.select().from(colorsTable);
  }
}
