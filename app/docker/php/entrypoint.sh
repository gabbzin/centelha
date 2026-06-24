#!/usr/bin/env sh
set -e

if [ ! -d "/var/www/html/vendor" ]; then
  echo "[entrypoint] Pasta vendor não encontrada. Instalando dependências..."
  composer install --no-interaction --no-progress
fi

if [ -f .env ]; then
  app_key=$(grep -E '^APP_KEY=' .env | cut -d '=' -f2- | tr -d '[:space:]')
  if [ -z "$app_key" ]; then
    echo "[entrypoint] APP_KEY vazio no .env. Tentando gerar..."
    php artisan key:generate --ansi || echo "[entrypoint] AVISO: Falha ao gerar APP_KEY. Verifique permissões do .env"
  fi
else
  echo "[entrypoint] AVISO: Arquivo .env não encontrado."
fi

mkdir -p storage/framework/cache storage/framework/data storage/framework/views storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache || true
chown -R www-data:www-data storage bootstrap/cache || true

php artisan storage:link --relative=false --ansi || true

if [ -n "${RUN_MIGRATIONS}" ]; then
  if [ "${APP_ENV}" = "production" ]; then
    php artisan migrate --force --ansi
  else
    php artisan migrate --ansi
  fi
fi

if [ -n "${RUN_SEEDERS}" ]; then
  if [ "${APP_ENV}" = "production" ]; then
    php artisan db:seed --force --ansi
  else
    php artisan db:seed --ansi
  fi
fi

if [ -d /var/www/html/public.dist ] && [ ! -d /var/www/html/public/build ]; then
  cp -a /var/www/html/public.dist/* /var/www/html/public/
fi

exec "$@"
