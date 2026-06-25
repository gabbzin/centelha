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

php artisan storage:link --relative=false --ansi || true

if [ "${RUN_MIGRATIONS}" = "1" ]; then
  if [ "${APP_ENV}" = "production" ]; then
    php artisan migrate --force --ansi
  else
    php artisan migrate --ansi
  fi
fi

if [ "${RUN_SEEDERS}" = "1" ]; then
  if [ "${APP_ENV}" = "production" ]; then
    php artisan db:seed --force --ansi
  else
    php artisan db:seed --ansi
  fi
fi

if [ ! -f public/build/manifest.json ] && [ ! -f public/build/hot ]; then
  if [ -d node_modules ]; then
    echo "[entrypoint] Vite manifest ausente e dev server inativo. Gerando build de fallback..."
    npm run build --silent || echo "[entrypoint] AVISO: npm run build falhou. Inicie o serviço 'vite' para HMR."
  else
    echo "[entrypoint] AVISO: node_modules ausente. Inicie o serviço 'vite' (npm install) ou rode 'npm ci && npm run build'."
  fi
fi

if [ -d /var/www/html/public.dist ] && [ ! -d /var/www/html/public/build ]; then
  cp -a /var/www/html/public.dist/* /var/www/html/public/
fi

chown -R www-data:www-data storage bootstrap/cache || true

exec "$@"
