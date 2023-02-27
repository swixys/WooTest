<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined('ABSPATH') || exit;

get_header('shop');

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action('woocommerce_before_main_content');

?>
    <header class="woocommerce-products-header">
        <?php if (apply_filters('woocommerce_show_page_title', true)) : ?>
            <h1 class="woocommerce-products-header__title page-title"><?php woocommerce_page_title(); ?></h1>
        <?php endif; ?>
        <?php
        do_action('woocommerce_archive_description');
        ?>
    </header>
<?php
$min_price = $wpdb->get_var("SELECT min(meta_value+0) FROM $wpdb->postmeta WHERE meta_key='_price'");
$max_price = $wpdb->get_var("SELECT max(meta_value+0) FROM $wpdb->postmeta WHERE meta_key='_price'");
$categories = get_terms('taxonomy=product_cat&hide_empty=0');
$all_categories = array();
if (!empty($categories)) {
    foreach ($categories as $category) {
        array_push($all_categories, $category->term_id);
    }
}
$sizes = get_terms('taxonomy=pa_size&hide_empty=0');
$all_sizes = array();
if (!empty($sizes)) {
    foreach ($sizes as $size) {
        array_push($all_sizes, $size->slug);
    }
}

?>
    <div class="shop">
        <div class="filter_product"
             data-min_price="<?php echo $min_price; ?>"
             data-max_price="<?php echo $max_price; ?>"
             data-category="<?php echo(implode(",", $all_categories)) ?>"
             data-size="<?php echo(implode(",", $all_sizes)) ?>"
             data-page="1"
        >
            <h4 class="filter_title">Category</h4>
            <div class="filter_product_category">
                <?php
                if ($terms = get_terms(array('taxonomy' => 'product_cat', 'orderby' => 'name'))) {
                    foreach ($terms as $term) {
                        echo '<div  class="filter_product_category_item" data-category="' . $term->term_id . '">' . $term->name . '</div>';
                    }
                } ?>
            </div>
            <h4 class="filter_title">Size</h4>
            <div class="filter_product_size">
                <?php
                if ($terms = get_terms(array('taxonomy' => 'pa_size', 'orderby' => 'name'))) {
                    foreach ($terms as $term) {
                        echo '<div  class="filter_product_size_item" data-size="' . $term->slug . '">' . $term->name . '</div>';
                    }
                }
                ?>
            </div>

            <div class="range_container">
                <h4 class="range_container_price">Price</h4>
                <div class="sliders_control">
                    <input id="fromSlider" type="range" value="<?php echo $min_price; ?>"
                           min="<?php echo $min_price; ?>" max="<?php echo $max_price; ?>"/>
                    <input id="toSlider" type="range" value="<?php echo $max_price; ?>" min="<?php echo $min_price; ?>"
                           max="<?php echo $max_price; ?>"/>
                </div>
                <div class="form_control">
                    <div class="form_control_container">
                        <div class="form_control_container__time">Min :</div>
                        <input class="form_control_container__time__input" id="fromInput"
                               value="<?php echo $min_price; ?>" min="<?php echo $min_price; ?>"
                               max="<?php echo $max_price; ?>/>
                    </div>
                    <div class=" form_control_container">
                        <div class="form_control_container__time">Max :</div>
                        <input class="form_control_container__time__input" id="toInput"
                               value="<?php echo $max_price; ?>" min="<?php echo $min_price; ?>"
                               max="<?php echo $max_price; ?>"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="sort_product" data-sort-type="date" data-order="desc" data-view="">
                <select>
                    <option data-sort-type="date" data-order="desc">Sort by new</option>
                    <option data-sort-type="date" data-order="asc">Sort by latest</option>
                    <option data-sort-type="_price" data-order="asc">Sort by price: low to high</option>
                    <option data-sort-type="_price" data-order="desc">Sort by price: high to low</option>
                </select>
                <div class="view_product">
                    <img class="view_product_spis" src="<?php echo get_stylesheet_directory_uri(); ?>/src/images/spis.png" alt="">
                    <img class="view_product_tile" src="<?php echo get_stylesheet_directory_uri(); ?>/src/images/tile.png" alt="">
                </div>
            </div>
            <div class="product_container">
                <?php
                $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                $args = array(
                    'post_type' => 'product',
                    'posts_per_page' => '8',
                    'posts_per_archive_page' => '8',
                    'orderby' => 'date',
                    'meta_key' => '',
                    'order' => 'desc',

                    'paged' => 1,
                    'meta_query' => array(
                        array(
                            'key' => '_price',
                            'value' => array($min_price, $max_price),
                            'compare' => 'BETWEEN',
                            'type' => 'NUMERIC'
                        )
                    ),
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'pa_size',
                            'field' => 'slug',
                            'terms' => array(implode(",", $all_sizes)),
                            'operator' => 'EXISTS',
                        )
                    ),
                );

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
                        "current" => max(1, $paged),
                        "total" => $query->max_num_pages,
                    ]);

                    ?>
                </div>
            </div>
        </div>
    </div>

<?php get_footer('shop');
