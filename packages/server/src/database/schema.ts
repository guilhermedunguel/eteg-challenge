import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const colorsTable = pgTable("colors", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  hex: varchar("hex", { length: 7 }).notNull(),
});
