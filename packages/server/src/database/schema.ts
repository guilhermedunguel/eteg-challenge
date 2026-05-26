import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const colorsTable = pgTable("colors", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  hex: varchar("hex", { length: 7 }).notNull(),
});

export const clientsTable = pgTable("clients", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 11 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  favoriteColorId: integer("favorite_color_id")
    .references(() => colorsTable.id)
    .notNull(),
  observations: varchar("observations", { length: 1000 }),
});
