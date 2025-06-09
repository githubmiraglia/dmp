FROM php:7.4-apache

# Set working directory
WORKDIR /var/www/html

# Enable SSL and mod_rewrite
RUN a2enmod ssl rewrite

# Copy placeholder index and config will be mounted later
COPY index.html /var/www/html/index.html

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Expose HTTP and HTTPS
EXPOSE 80 443

# Run Apache in the foreground
CMD ["apachectl", "-D", "FOREGROUND"]
