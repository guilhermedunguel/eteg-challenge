import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✅ Migrations applied");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
