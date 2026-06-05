#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

echo "=== Centelha Setup ==="

if [ ! -f app/.env ]; then
  echo "Criando .env a partir de .env.docker..."
  cp app/.env.docker app/.env
fi

app_key=$(grep -E '^APP_KEY=' app/.env | cut -d '=' -f2- | tr -d '[:space:]')

if [ -z "$app_key" ]; then
  echo "Gerando APP_KEY..."
  
  if command -v php &> /dev/null; then
    php -r "echo 'APP_KEY=' . base64_encode(random_bytes(32)) . PHP_EOL;" >> app/.env
  else
    echo "AVISO: PHP não encontrado. Certifique-se de que APP_KEY está definido no app/.env antes de subir os containers."
  fi
else
  echo "APP_KEY já definido."
fi

echo ""
echo "Setup concluído. Para iniciar os containers, execute:"
echo "  docker-compose up -d --build"
