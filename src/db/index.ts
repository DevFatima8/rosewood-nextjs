import { drizzle as postgresDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as mysqlDrizzle } from "drizzle-orm/mysql2";
import { Pool as PostgresPool } from "pg";
import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required");

export const databaseDialect = databaseUrl.startsWith("mysql://") || databaseUrl.startsWith("mysql2://") ? "mysql" : "postgresql";
const globalForDb = globalThis as typeof globalThis & { rosewoodPostgresPool?: PostgresPool; rosewoodMysqlPool?: mysql.Pool };

let postgresPool: PostgresPool | undefined;
let mysqlPool: mysql.Pool | undefined;

if (databaseDialect === "mysql") {
  mysqlPool = globalForDb.rosewoodMysqlPool ?? mysql.createPool({ uri: databaseUrl, connectionLimit: 8, enableKeepAlive: true });
  if (process.env.NODE_ENV !== "production") globalForDb.rosewoodMysqlPool = mysqlPool;
} else {
  postgresPool = globalForDb.rosewoodPostgresPool ?? new PostgresPool({ connectionString: databaseUrl });
  if (process.env.NODE_ENV !== "production") globalForDb.rosewoodPostgresPool = postgresPool;
}

export const pgDb = postgresPool ? postgresDrizzle(postgresPool) : null;
export const mysqlDb = mysqlPool ? mysqlDrizzle(mysqlPool) : null;
