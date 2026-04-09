# Group2 Lost & Found

Angular frontend with a PHP API backend for reports and admin authentication.

## Tech Stack

- Angular 21
- PHP (built-in dev server)
- MySQL
- Bootstrap 5 + Bootstrap Icons

## Project Structure

- `src/` Angular app
- `api/` PHP API (`auth`, `reports`, `categories`, `uploads`)
- `public/` static public assets used by Angular

## Local Development

Run both servers in separate terminals.

1. Start PHP API server (from project root):

```bash
cd (project directory)
php -S 127.0.0.1:8000 -t .
```

2. Start Angular dev server (from project root):

```bash
cd (project directory)
npm install
npm start
```

3. Open:

- Frontend: `http://localhost:4200` (or the port shown by Angular)
- API health check: `http://127.0.0.1:8000/api/health.php`

## API Proxy

Angular proxies `/api/*` requests to PHP:

- `proxy.conf.json` target should be `http://127.0.0.1:8000`

If frontend calls fail with `ECONNREFUSED` or `404` on `/api/...`, verify PHP is running on port `8000`.

## Database

API DB config is in:

- `api/config.php`

Ensure host, port, database, username, and password match your local MySQL setup.

## Image Upload + Display

- Uploaded files are saved to `api/uploads/`
- `reports.image_path` stores values like `api/uploads/<filename>`
- Public page displays images from `/api/uploads/<filename>`
- Fallback image is served from `public/images/placeholder.jpg`

## Routes

- `/` public listing
- `/add-item` add item form
- `/admin-login` admin login
- `/admin-dashboard` admin dashboard

## Build

```bash
npm run build
```

## Troubleshooting

- Port already in use:
  - `lsof -nP -iTCP:8000 -sTCP:LISTEN`
  - `lsof -nP -iTCP:4200 -sTCP:LISTEN`
- API returns 500:
  - check `api/config.php` credentials and MySQL availability
- Frontend shows no data:
  - confirm report status is `Approved`
  - confirm PHP server is running and proxy target is correct
