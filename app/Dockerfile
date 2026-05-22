FROM node:22-bookworm AS node

FROM php:8.4-fpm-bookworm AS base

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    unzip \
    zip \
    && docker-php-ext-install pdo_pgsql pgsql mbstring exif pcntl bcmath gd zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

FROM base AS dev

RUN pecl install xdebug && docker-php-ext-enable xdebug

COPY docker/php/php.dev.ini /usr/local/etc/php/conf.d/99-app.ini
COPY docker/php/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm"]

FROM base AS builder

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM base AS production

COPY docker/php/php.prod.ini /usr/local/etc/php/conf.d/99-app.ini
COPY --from=builder /var/www/html /var/www/html
COPY docker/php/entrypoint.sh /entrypoint.sh

RUN cp -a /var/www/html/public /var/www/html/public.dist

RUN chmod +x /entrypoint.sh \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

USER www-data

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm"]
