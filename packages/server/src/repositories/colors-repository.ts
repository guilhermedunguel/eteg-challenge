import { Database } from "../database";
import { colorsTable } from "../database/schema";

export type Color = typeof colorsTable.$inferSelect;

export interface IColorsRepository {
  findAll(): Promise<Color[]>;
}

export class ColorsRepository implements IColorsRepository {
  constructor(private database: Database) {}

  async findAll() {
    return this.database.select().from(colorsTable);
  }
}
