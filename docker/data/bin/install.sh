#!/bin/sh

if [ -f "/var/www/html/wp-config.php" ]; then

    rm -rf /var/www/html/wp-content/plugins/akismet
    rm -f /var/www/html/wp-content/plugins/hello.php

    # Display version
    wp cli version

    if ! wp core is-installed; then
        wp core install --path="/var/www/html" --url="http://localhost:8088" --title="Local Wordpress By Docker" --admin_user=admin --admin_password=admin --admin_email='admin@example.com'
    fi

    # Install Wordpress
    wp language core install en_US
    wp language core activate en_US

    # Setup rewrite rules
    wp rewrite structure '%postname%/'
    wp rewrite flush --hard

    # Leyka
    # wp plugin install leyka --activate

    # Template
    # wp theme activate test

    wp config set WP_DEBUG true --raw
    wp config set WP_DEBUG_LOG true --raw

    if [ $(wp post list --format=count) -lt 22 ]; then 
        wp post generate --count=2 --post_content
        echo 'Post generated'
    fi

    echo "php_value upload_max_filesize 256M" >> /var/www/html/.htaccess
    echo "php_value post_max_size 256M" >> /var/www/html/.htaccess
    echo "php_value memory_limit 256M" >> /var/www/html/.htaccess

fi