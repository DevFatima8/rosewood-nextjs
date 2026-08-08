import { databaseDialect, mysqlDb, pgDb } from "@/db";
import { mysqlGalleryImages } from "@/db/mysql-schema";
import { galleryImages } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export type GalleryRecord = {
  id: number;
  title: string;
  altText: string;
  imageUrl: string;
  cloudinaryPublicId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type GalleryInput = Pick<GalleryRecord, "title" | "altText" | "imageUrl" | "cloudinaryPublicId">;
let initialization: Promise<void> | null = null;

export function ensureGallerySchema() {
  if (!initialization) initialization = initializeSchema();
  return initialization;
}

async function initializeSchema() {
  if (databaseDialect === "mysql") {
    if (!mysqlDb) throw new Error("MySQL database client is unavailable.");
    await mysqlDb.execute(sql.raw(`CREATE TABLE IF NOT EXISTS gallery_images (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(120) NOT NULL,
      alt_text VARCHAR(180) NOT NULL DEFAULT 'rosewood Hotel gallery image',
      image_url TEXT NOT NULL,
      cloudinary_public_id VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`));
  } else {
    if (!pgDb) throw new Error("PostgreSQL database client is unavailable.");
    await pgDb.execute(sql.raw(`CREATE TABLE IF NOT EXISTS gallery_images (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      alt_text TEXT NOT NULL DEFAULT 'rosewood Hotel gallery image',
      image_url TEXT NOT NULL,
      cloudinary_public_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`));
    await pgDb.execute(sql.raw("ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS cloudinary_public_id TEXT"));
  }
}

export async function listGalleryImages(): Promise<GalleryRecord[]> {
  await ensureGallerySchema();
  if (databaseDialect === "mysql") return mysqlDb!.select().from(mysqlGalleryImages).orderBy(desc(mysqlGalleryImages.createdAt));
  return pgDb!.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
}

export async function findGalleryImage(id: number): Promise<GalleryRecord | undefined> {
  await ensureGallerySchema();
  if (databaseDialect === "mysql") return (await mysqlDb!.select().from(mysqlGalleryImages).where(eq(mysqlGalleryImages.id, id)).limit(1))[0];
  return (await pgDb!.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1))[0];
}

export async function createGalleryImage(input: GalleryInput): Promise<GalleryRecord> {
  await ensureGallerySchema();
  if (databaseDialect === "mysql") {
    const result = await mysqlDb!.insert(mysqlGalleryImages).values(input).$returningId();
    const image = await findGalleryImage(result[0].id);
    if (!image) throw new Error("Created gallery image could not be read.");
    return image;
  }
  const [image] = await pgDb!.insert(galleryImages).values(input).returning();
  return image;
}

export async function updateGalleryImage(id: number, input: GalleryInput): Promise<GalleryRecord | undefined> {
  await ensureGallerySchema();
  if (databaseDialect === "mysql") {
    await mysqlDb!.update(mysqlGalleryImages).set({ ...input, updatedAt: new Date() }).where(eq(mysqlGalleryImages.id, id));
    return findGalleryImage(id);
  }
  return (await pgDb!.update(galleryImages).set({ ...input, updatedAt: new Date() }).where(eq(galleryImages.id, id)).returning())[0];
}

export async function removeGalleryImage(id: number): Promise<GalleryRecord | undefined> {
  const image = await findGalleryImage(id);
  if (!image) return undefined;
  if (databaseDialect === "mysql") await mysqlDb!.delete(mysqlGalleryImages).where(eq(mysqlGalleryImages.id, id));
  else await pgDb!.delete(galleryImages).where(eq(galleryImages.id, id));
  return image;
}

export async function checkDatabaseConnection() {
  await ensureGallerySchema();
  if (databaseDialect === "mysql") await mysqlDb!.execute(sql`select 1`);
  else await pgDb!.execute(sql`select 1`);
  return databaseDialect;
}
