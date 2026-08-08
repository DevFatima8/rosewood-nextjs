import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL ?? "";
const isMySql = url.startsWith("mysql://") || url.startsWith("mysql2://");

export default defineConfig(isMySql ? {
  dialect: "mysql",
  schema: "./src/db/mysql-schema.ts",
  dbCredentials: { url },
} : {
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: { url },
});
