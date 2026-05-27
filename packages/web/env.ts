import { z } from "zod";

const envSchema = z.object({
  VITE_SERVER_URL: z.url(),
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.flattenError(result.error).fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const env = result.data;
