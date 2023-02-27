<?php
// replace text button on archive page
add_filter('woocommerce_product_add_to_cart_text', function ($text) {
    global $product;
    if ($product->is_type('variable')) {
        $text = $product->is_purchasable() ? __('Select variation', 'woocommerce') : __('Read more', 'woocommerce');
    }
    if ($product->is_type('simple')) {
        $text = $product->is_purchasable() ? __('Add simple product', 'woocommerce') : __('Read more', 'woocommerce');
    }
    return $text;
}, 10);

// add show description product on shop
add_action('woocommerce_after_shop_loop_item_title', 'woo_test_show_description', 40);
function woo_test_show_description()
{
    echo wp_trim_words(get_the_excerpt(), 10);
}

//change size image
add_filter( 'woocommerce_get_image_size_thumbnail', 'woo_test_catalog_image_size' ); // woocommerce_single
function woo_test_catalog_image_size( $size_options ){

    return array(
        'width' => 400,
        'height' => 300,
        'crop' => 1,
    );

}

/// ADD LABEL FOR PRODUCT
//add custom tab in product date
add_filter('woocommerce_product_data_tabs', 'woo_test_product_data_tab');
function woo_test_product_data_tab($tabs)
{
    $tabs['Label'] = array(
        'label' => 'Label',
        'target' => 'product_label',
        'priority' => 9999,
    );
    return $tabs;
}
//add select for selected label
add_action('woocommerce_product_data_panels', 'woo_test_product_data_select');
function woo_test_product_data_select()
{
    echo '<div id="product_label" class="panel woocommerce_options_panel">';
    woocommerce_wp_select(array(
        'id' => '_select',
        'label' => 'Select label',
        'options' => array(
            '' => __('-', 'woocommerce'),
            'New' => __('New', 'woocommerce'),
            'Bestseller' => __('Bestseller', 'woocommerce'),
        ),
    ));
    echo '</div>';
}
//save data select
add_action('woocommerce_process_product_meta', 'woo_test_product_data_select_save', 10);
function woo_test_product_data_select_save($post_id)
{
    $product = wc_get_product($post_id);
    $select_field = isset($_POST['_select']) ? sanitize_text_field($_POST['_select']) : '';
    $product->update_meta_data('_select', $select_field);
    $product->save();

}
//display label on front
add_action('woocommerce_before_shop_loop_item_title', 'woo_test_product_data_select_display', 9);
function woo_test_product_data_select_display()
{
    global $post, $product;
    $label = get_post_meta($post->ID, '_select', true);
    if ($label) {
        ?>
        <div class="product-label <?php echo $label; ?>">
            <?php echo $label; ?>
        </div>
    <?php }
}

///ajax update count cart
add_filter('woocommerce_add_to_cart_fragments', function ($fragment) {
    $fragment['.mini-cart-count'] = '<span class="mini-cart-count">(' . WC()->cart->get_cart_contents_count() . ')</span>';
    return $fragment;
});

///display mini cart after add product in archive page
add_action('wp_footer', 'woo_test_open_cart_archive');
function woo_test_open_cart_archive()
{
    ?>
    <script type="text/javascript">
        (function ($) {
            $('body').on('added_to_cart', function () {
                if (!$('.mini-cart-modal').css('display', 'block')) {
                    $('.mini-cart-modal').css('display', 'block');
                }
            });
        })(jQuery);
    </script>
    <?php
}

///display mini cart after add product in single page
add_action('wp_footer', 'woo_test_open_cart_single');
function woo_test_open_cart_single()
{
    if (isset($_POST['add-to-cart']) && $_POST['add-to-cart'] > 0
        && isset($_POST['quantity']) && $_POST['quantity'] > 0) :
        ?>
        <script type="text/javascript">
            (function ($) {
                $(".mini-cart-modal").css('display', 'block');
            })(jQuery);
        </script>
    <?php
    endif;
}
//hide message add cart
add_filter('wc_add_to_cart_message_html', '__return_false');

// replace text add button on single page
add_filter('woocommerce_product_single_add_to_cart_text', 'woo_test_add_to_cart_button_text_single');
function woo_test_add_to_cart_button_text_single()
{
    return __('Select and add', 'woocommerce');
}

// replace text add button on single page after add to cart
add_filter('woocommerce_product_single_add_to_cart_text', 'woo_test_add_to_cart_button_text_single_after_add');
function woo_test_add_to_cart_button_text_single_after_add($text)
{
    if (WC()->cart->find_product_in_cart(WC()->cart->generate_cart_id(get_the_ID()))) {
        $text = 'Checkout';
    }
    return $text;
}

//display rating before title
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10);
add_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 0);

//add class to body
add_filter('body_class', 'woo_test_add_productick_class_to_body');
function woo_test_add_productick_class_to_body($classes)
{
    if (is_product()) {
        $product_type = wc_get_product()->get_type();
        $classes[] = sanitize_html_class($product_type . '-productick');
    }
    return $classes;
}

?>