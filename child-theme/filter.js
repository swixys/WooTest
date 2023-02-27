jQuery(function ($) {
    const allCategory = []
    $('.filter_product_category_item').each(function () {
        allCategory.push($(this).attr('data-category'));
    });
    let allCategoryString = allCategory.join(',');
    const allSizes = []
    $('.filter_product_size_item').each(function () {
        allSizes.push($(this).attr('data-size'));
    });
    let allSizesString = allSizes.join(',');
    $(document).on('click', '.filter_product_category_item', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        let categories = [];
        $('.filter_product_category_item.active').each(function () {
            categories.push($(this).attr('data-category'));
        });
        let categoriesString = categories.join(',');
        let categoriesFilter
        if (!categoriesString) {
            categoriesFilter = allCategoryString
        } else {
            categoriesFilter = categoriesString
        }
        let min_price_var = $('.filter_product').attr('data-min_price');
        let max_price_var = $('.filter_product').attr('data-max_price');
        let size_var = $('.filter_product').attr('data-size');
        let type_sort_var = $('.sort_product').attr('data-sort-type');
        let order_sort_var = $('.sort_product').attr('data-order');

        $.ajax({
            url: wp_ajax.ajax_url,
            data: {
                action: 'filter',
                category: categoriesFilter,
                min_price: min_price_var,
                max_price: max_price_var,
                size: size_var,
                type_sort: type_sort_var,
                order_sort: order_sort_var
            },
            type: 'post',
            success: function (result) {
                $('.product_container').html(result);
                $('.filter_product').attr('data-category', categoriesFilter);
            },
            error: function (result) {
                console.warn(result);
            }
        });
    });
    $(document).on('click', '.filter_product_size_item', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        let sizes = [];
        $('.filter_product_size_item.active').each(function () {
            sizes.push($(this).attr('data-size'));
        });
        let sizesString = sizes.join(',');
        let sizesFilter
        if (!sizesString) {
            sizesFilter = allSizesString
        } else {
            sizesFilter = sizesString
        }
        let category_var = $('.filter_product').attr('data-category');
        let min_price_var = $('.filter_product').attr('data-min_price');
        let max_price_var = $('.filter_product').attr('data-max_price');
        let type_sort_var = $('.sort_product').attr('data-sort-type');
        let order_sort_var = $('.sort_product').attr('data-order');
        $.ajax({
            url: wp_ajax.ajax_url,
            data: {
                action: 'filter',
                category: category_var,
                min_price: min_price_var,
                max_price: max_price_var,
                size: sizesFilter,
                type_sort: type_sort_var,
                order_sort: order_sort_var
            },
            type: 'post',
            success: function (result) {
                $('.product_container').html(result);
                $('.filter_product').attr('data-size', sizesFilter);
            },
            error: function (result) {
                console.warn(result);
            }
        });
    });
    $('#fromSlider').on('input', function () {
        let min_price_var = this.value;
        let category_var = $('.filter_product').attr('data-category');
        let max_price_var = $('.filter_product').attr('data-max_price');
        let size_var = $('.filter_product').attr('data-size');
        let type_sort_var = $('.sort_product').attr('data-sort-type');
        let order_sort_var = $('.sort_product').attr('data-order');
        $.ajax({
            url: wp_ajax.ajax_url,
            data: {
                action: 'filter',
                min_price: min_price_var,
                max_price: max_price_var,
                category: category_var,
                size: size_var,
                type_sort: type_sort_var,
                order_sort: order_sort_var
            },
            type: 'post',
            success: function (result) {
                $('.product_container').html(result);
                $('.filter_product').attr('data-min_price', min_price_var);
            },
            error: function (result) {
                console.warn(result);
            }
        });
    });
    $('#toSlider').on('input', function () {
        let max_price_var = this.value;
        let category_var = $('.filter_product').attr('data-category');
        let min_price_var = $('.filter_product').attr('data-min_price');
        let size_var = $('.filter_product').attr('data-size');
        let type_sort_var = $('.sort_product').attr('data-sort-type');
        let order_sort_var = $('.sort_product').attr('data-order');
        $.ajax({
            url: wp_ajax.ajax_url,
            data: {
                action: 'filter',
                min_price: min_price_var,
                max_price: max_price_var,
                category: category_var,
                size: size_var,
                type_sort: type_sort_var,
                order_sort: order_sort_var
            },
            type: 'post',
            success: function (result) {
                $('.product_container').html(result);
                $('.filter_product').attr('data-max_price', max_price_var);
            },
            error: function (result) {
                console.warn(result);
            }
        });
    });
    $(document).on('click', '.page-numbers', function (e) {
        e.preventDefault();
        let page_var = $(this).text()
        console.log(page_var)
        let max_price_var = $('.filter_product').attr('data-max_price');
        let category_var = $('.filter_product').attr('data-category');
        let min_price_var = $('.filter_product').attr('data-min_price');
        let size_var = $('.filter_product').attr('data-size');
        let type_sort_var = $('.sort_product').attr('data-sort-type');
        let order_sort_var = $('.sort_product').attr('data-order');
        $.ajax({
            url: wp_ajax.ajax_url,
            data: {
                action: 'filter',
                min_price: min_price_var,
                max_price: max_price_var,
                category: category_var,
                size: size_var,
                page: page_var,
                type_sort: type_sort_var,
                order_sort: order_sort_var
            },
            type: 'post',
            success: function (result) {
                $('.product_container').html(result);
                $('.filter_product').attr('data-page', page_var);
            },
            error: function (result) {
                console.warn(result);
            }
        });
    });
    $(document).on('change', '.sort_product', function () {
        let type_sort_var = $('.sort_product option:selected').attr('data-sort-type')
        let order_sort_var = $('.sort_product option:selected').attr('data-order')
        let max_price_var = $('.filter_product').attr('data-max_price');
        let category_var = $('.filter_product').attr('data-category');
        let min_price_var = $('.filter_product').attr('data-min_price');
        let size_var = $('.filter_product').attr('data-size');
        $.ajax({
            url: wp_ajax.ajax_url,
            data: {
                action: 'filter',
                min_price: min_price_var,
                max_price: max_price_var,
                category: category_var,
                size: size_var,
                type_sort: type_sort_var,
                order_sort: order_sort_var
            },
            type: 'post',
            success: function (result) {
                $('.product_container').html(result);
                $('.sort_product').attr('data-sort-type', type_sort_var);
                $('.sort_product').attr('data-order', order_sort_var);
            },
            error: function (result) {
                console.warn(result);
            }
        });
    });
});