import { db } from ".";
import { colorsTable } from "./schema";

const colors = [
  { name: "Vermelho", hex: "#ef4444" },
  { name: "Laranja", hex: "#f97316" },
  { name: "Amarelo", hex: "#eab308" },
  { name: "Verde", hex: "#22c55e" },
  { name: "Azul", hex: "#3b82f6" },
  { name: "Indigo", hex: "#6366f1" },
  { name: "Violeta", hex: "#8b5cf6" },
];

async function seed() {
  await db.insert(colorsTable).values(colors).onConflictDoNothing();

  console.log("✅ Seed completed");
}

seed();
