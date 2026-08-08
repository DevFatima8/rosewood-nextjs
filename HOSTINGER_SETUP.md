# rosewood HOTEL — Hostinger setup

## 1. Create the database

In Hostinger hPanel, open **Databases → MySQL Databases** and create a database and database user. Copy the database name, username, password, hostname and port shown by Hostinger.

## 2. Configure environment variables

Add these variables to the Node.js application's environment settings (or its `.env` file):

```env
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@DB_HOST:3306/DB_NAME
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

Use the exact database hostname provided in hPanel; do not replace it with `localhost` unless Hostinger explicitly shows `localhost`. URL-encode special characters in database credentials (`@` → `%40`, `#` → `%23`, `/` → `%2F`, and so on).

## 3. Gallery table

The app automatically runs `CREATE TABLE IF NOT EXISTS gallery_images` on its first database request. No manual migration is required.

For manual setup, import `database/hostinger-gallery.sql` using hPanel phpMyAdmin.

The table stores only image metadata and Cloudinary URLs. Actual image files are stored on Cloudinary, so they remain available across builds and server restarts.

## 4. Deploy

Build command: `npm run build`

Start command: `npm run start`

After deployment, open `/api/health`. A successful MySQL connection returns:

```json
{"ok":true,"service":"rosewood-hotel","database":"mysql"}
```

Use `/admin/gallery` to upload, edit and delete gallery images. Public images appear on `/gallery`.

## 5. Formspree contact form

Create a form at [formspree.io](https://formspree.io), copy the endpoint shown for the form (for example `https://formspree.io/f/abcxyzde`) and set it as `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Hostinger. Rebuild/redeploy after changing this public environment variable. Contact inquiries from `/contact` will then be delivered to the email verified in your Formspree account.
