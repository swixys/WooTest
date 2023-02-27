<?php
function load_scripts()
{
    $theme_version = wp_get_theme()->get('Version');
    wp_enqueue_style('woo-style', get_theme_file_uri() . '/assets/css/main.css', [], $theme_version);
    wp_enqueue_script('woo-script', get_theme_file_uri() . '/assets/js/main.js', array(), $theme_version, true);
    wp_enqueue_script('ajax', get_theme_file_uri() . '/filter.js', array('jquery'), NULL, true);
    wp_localize_script('ajax', 'wp_ajax',
        array('ajax_url' => admin_url('admin-ajax.php'))
    );
}

add_action('wp_enqueue_scripts', 'load_scripts');
add_action('wp_ajax_nopriv_filter', 'filter_ajax');
add_action('wp_ajax_filter', 'filter_ajax');