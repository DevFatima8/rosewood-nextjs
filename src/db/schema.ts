import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  altText: text("alt_text").notNull().default("rosewood Hotel gallery image"),
  imageUrl: text("image_url").notNull(),
  cloudinaryPublicId: text("cloudinary_public_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
