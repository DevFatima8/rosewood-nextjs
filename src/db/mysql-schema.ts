import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const mysqlGalleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  altText: varchar("alt_text", { length: 180 }).notNull().default("rosewood Hotel gallery image"),
  imageUrl: text("image_url").notNull(),
  cloudinaryPublicId: varchar("cloudinary_public_id", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
