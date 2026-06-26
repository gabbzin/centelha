# AGENTS.md — Centelha

## TL;DR

- This is a **Laravel 12 + React 19 + Inertia + Vite** app inside `app/`. The root README's `api/` + `web/` structure is outdated.
- Primary dev environment is **Docker Compose**.
- Start: `./setup.sh && docker compose up -d --build`. App: http://localhost:8080, Vite HMR: http://localhost:5173.
- After first start run migrations/seeds: `docker exec centelha-php php artisan migrate --seed`.
- Default admin login: `admin@centelha.com` / `Centelha@2026!Admin`.

## Project layout

- `app/` — entire application (backend + frontend). Do not create `api/` or `web/`.
- `app/routes/web.php`, `auth.php`, `settings.php` — route files.
- `app/resources/js/pages/**/*.tsx` — Inertia page components.
- `app/resources/js/components/ui/` — shadcn/ui base components (Biome ignores this dir).
- `app/resources/js/components/laravel/`, `layout/`, `landing/`, `usuarios/`, `entregas/`, `customization/` — project-specific components.
- `app/database/seeders/` — seeders. `DatabaseSeeder` calls `Admin`, `CommunityCenter`, `Family`, `Benefit`.

## Environment & Docker

- Root `.env` (copy from `.env.example`) is **only for Docker Compose interpolation** (`APP_PUBLIC_URL`, `MINIO_PUBLIC_URL`). It is not the Laravel `.env`.
- Laravel env is `app/.env.docker`. `setup.sh` copies it to `app/.env` and generates `APP_KEY` if empty.
- Dev containers:
  - `centelha-php` — PHP 8.4 CLI/FPM.
  - `centelha-nginx` — port 8080.
  - `centelha-vite` — `npm run dev -- --host` on port 5173.
  - `centelha-pgsql` — PostgreSQL 16 on port 5432.
  - `centelha-minio` — S3-compatible storage on ports 9000/9001.
- Dev entrypoint **does not** run migrations/seeds. Prod compose (`docker-compose.prod.yml`) does (`RUN_MIGRATIONS=1`, `RUN_SEEDERS=1`) and includes a `queue` worker.
- MinIO bucket `centelha` is created by `minio-init`; `FILESYSTEM_DISK=minio` in `app/.env.docker`.

## Common commands

Run from repo root or inside the `centelha-php` container (`docker exec -it centelha-php sh`):

```bash
# Dependencies / build
composer install
npm install
npm run build
npm run build:ssr
composer dev            # non-Docker: runs serve, queue, pail, vite concurrently

# Laravel
php artisan migrate
php artisan migrate --seed
php artisan db:seed
php artisan queue:work --tries=3 --timeout=90
php artisan storage:link      # also run by entrypoint

# Tests (sqlite in-memory per phpunit.xml)
php artisan test
php artisan test --filter=BenefitTest
vendor/bin/phpunit --filter=BenefitTest
```

Frontend tooling (Biome):

```bash
npm run lint           # lint --write
npm run format         # format --write
npm run check          # lint + format + organize imports --write
npm run format:check   # read-only format check
npx biome check        # read-only full check (no npm script)
```

PHP style:

```bash
vendor/bin/pint        # Laravel preset, writes fixes
```

## Testing notes

- `phpunit.xml` forces `APP_ENV=testing`, `DB_CONNECTION=sqlite`, `:memory:` DB, `QUEUE_CONNECTION=sync`. Do not override to PostgreSQL unless you intend to.
- Some Feature tests hit MinIO for file uploads, so run tests inside the container where MinIO is reachable.
- 101 tests currently pass; run `php artisan test` before finishing work.

## Frontend conventions

- Use **shadcn/ui** components from `resources/js/components/ui/`.
- Reuse project wrappers from `resources/js/components/layout/header.tsx` and `resources/js/components/laravel/*`.
- Use theme tokens via CSS variables defined in `resources/css/app.css`. Avoid hard-coded Tailwind colors.
- Horizontal scroll areas must hide the scrollbar: `[&::-webkit-scrollbar]:hidden`.
- Use Badge variants; do not style a Badge with one-off classes.
- Sheet/Dialog: do not add a manual close button or header separator; shadcn Sheet already provides them.
- Prefer kebab-case file names for components, e.g. `user-form-modal.tsx`.

## Deployment

- Production image builds from `app/Dockerfile` target `production`. Multi-stage builder runs `composer install --no-dev`, `npm ci`, `npm run build`.
- Use `docker-compose.prod.yml`; set `APP_PUBLIC_URL` and `MINIO_PUBLIC_URL` in root `.env`.
- Prod entrypoint auto-runs migrations and seeders; queue runs as the separate `queue` service.

## Gotchas

- Prefer `npm` over `pnpm` even though `pnpm-lock.yaml` exists; Docker and scripts use `package-lock.json`.
- If `public/build/manifest.json` is missing and no Vite dev server is running, the PHP entrypoint runs `npm run build` as a fallback.
- `AppServiceProvider` shares the first `CommunityCenter` with the `app` Blade view; Inertia shared data lives in `HandleInertiaRequests`.
- Admin-only routes use `role:admin` middleware; regular authenticated routes use `auth`.
- `.editorconfig`: 4-space indent for PHP, 2-space for YAML. Biome uses 2-space for JS/TS.
