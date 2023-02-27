<?php
function filter_ajax()
{
    $size = $_POST['size'];
    $size_ids = explode(',', $size);
    $category = $_POST['category'];
    $category_ids = explode(',', $category);
    $min_price = $_POST['min_price'];
    $max_price = $_POST['max_price'];
    $page = $_POST['page'];
    $type_sort = $_POST['type_sort'];
    $order_sort = $_POST['order_sort'];
    if (isset($category) || isset($price) || isset($size) || isset($page)) {
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => '8',
            'posts_per_archive_page' => '8',
            'paged' => $page,
            'orderby' => $type_sort,
            'order' => $order_sort,
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'product_cat',
                    'terms' => array_values($category_ids)
                ),
                array(
                    'taxonomy' => 'pa_size',
                    'field' => 'slug',
                    'terms' => array_values($size_ids),
                    'operator' => 'IN',
                )
            ),
            'meta_query' => array(
                array(
                    'key' => '_price',
                    'value' => array($min_price, $max_price),
                    'compare' => 'BETWEEN',
                    'type' => 'NUMERIC'
                )
            ),

        );
    }
    $query = new WP_Query($args);
    woocommerce_product_loop_start();
    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            do_action('woocommerce_shop_loop');
            wc_get_template_part('content', 'product');
        endwhile;
    else:?>
        <h3> No products found, try changing the filter</h3>
    <?php endif;
    woocommerce_product_loop_end();
    wp_reset_postdata(); ?>
    <div class="blog-pagination">
        <?php echo paginate_links([
            "base" => str_replace(999999999, "%#%", get_pagenum_link(999999999)),
            'prev_text' => __('<'),
            'next_text' => __('>'),
            "format" => "",
            "current" => max(1, $page),
            "total" => $query->max_num_pages,
        ]);

        ?>
    </div>
    <? die();
}
