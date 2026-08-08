-- rosewood HOTEL Gallery structure for Hostinger MySQL / MariaDB
-- The application also creates this table automatically on first connection.

CREATE TABLE IF NOT EXISTS gallery_images (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  alt_text VARCHAR(180) NOT NULL DEFAULT 'rosewood Hotel gallery image',
  image_url TEXT NOT NULL,
  cloudinary_public_id VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_gallery_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
