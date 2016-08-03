(function ($, _this) {

    'use strict';
    
    // Пользовательские функции
    _this.textilFunctions = {
        addEvents: {}
    };
    // var cl  = function(msg){
    //     console.log(msg);
    // };

    // Fancybox

    $('.fancybox').fancybox();

    // Owl Carousel

    $('.product-gallery').find('.add-foto').owlCarousel({
        items: 3,
        nav: true,
        navText: ['', ''],
        loop: true
    });

    // Автодополнение поиска

    $.ajax({
        type: 'GET',
        url: 'autocomplete-search.json',
        success: function (response) {
            $('.autocomplete-search').autocomplete({source: response, appendTo: '.autocomplete-results', minLength: 3});
        }
    });

    // Всплывающее меню каталога

    var $catalogLink = $('.main-menu-list').find('li').eq(0).find('>a');

    $catalogLink.on('click', function (event) {
        event.preventDefault();

        if ($(this).hasClass('touched')) {
            $('.menu-catalog-list').removeClass('is-flex');
            $(this).removeClass('touched');
        } else {
            $(this).addClass('touched');
            $('.menu-catalog-list').addClass('is-flex');
        }
    });

    
    // Всплывающее окно при клике - добавить товар в корзину (купить)
    // Вынес в отдельную функцию для повторного навешивания при фильтрации
    _this.textilFunctions.addEvents.toCart = function () {
        var $shopPageButton = $('.buy-button'),
            $shopPagePopupWrap = $('.shop-page-popup-wrap'),
            $shopPagePopup = $('.shop-page-popup'),
            $shopPageFade = $('.shop-page-fade'),
            $shopPageGoon = $('.button-goon'),
            shopPageTimeout = 700;
    
        $shopPageButton.on('click', function () {
            $shopPagePopupWrap.addClass('is-flex');
            $shopPagePopup.add($shopPageFade).addClass('is-visible form-fade-in');
        });
    
        $shopPageGoon.add($shopPageFade).on('click', function () {
            $shopPagePopup.add($shopPageFade).removeClass('form-fade-in').addClass('form-fade-out');
            setTimeout(function () {
                $shopPagePopupWrap.removeClass('is-flex');
            }, shopPageTimeout);
        });
    };
    _this.textilFunctions.addEvents.toCart();
    // Не выводим блок с опциями товара если их нет

    var $productOptions = $('.product-content').find('.options-item'),
        itemCounter = 0;

    $productOptions.each(function () {
        var productDataName = $(this).find('select > option').eq(0).data();

        if (productDataName) {
            if (productDataName.name === 'undefined') {
                $(this).addClass('is-hidden');
                itemCounter = itemCounter + 1;
            }
        }
    });

    if (itemCounter === $productOptions.size()) {
        $productOptions.parent().addClass('is-hidden');
    }

    // Изменение количества товара на старнице товара

    var $inputCount = $('#productQuantity');

    $inputCount.spinner({
        change: function () {
            $('#hiddenCount').val($(this).val());
        }
    });

    // Фиксированно верхнее меню
    
    // Отключаем для Firefox
    if(navigator.userAgent.indexOf('Firefox') < 0) {
        var $topMenu = $('.main-menu-wrap'),
            topMenuTopPos = $topMenu.offset().top,
            topMenuHeight = $topMenu.height(),
            $topMenuAfter = $('<div>').attr('class', 'menu-fix');
    
        $topMenu.after($topMenuAfter);
    
        $(window).scroll(function () {
            if ($(this).scrollTop() >= topMenuTopPos) {
                if(!$topMenu.hasClass('fixed-top')) {
                    $topMenu.addClass('fixed-top');
                    $topMenuAfter.css({height: topMenuHeight});
                }
            } else {
                if($topMenu.hasClass('fixed-top')) {
                    $topMenu.removeClass('fixed-top');
                    $topMenuAfter.css({height: 0});
                }
            }
        });
    }

    // Скрываем поле плотность (на конечной странице товара), если оно не заполнено

    var $densityProduct = $('.info .density');

    if ($densityProduct.find('span').text() === '') {
        $densityProduct.addClass('is-hidden');
    }

    // Скрываем поле цвет (на странице категории), если оно пустое

    var $infoColor = $('.info .color');

    if ($infoColor.find('span').text() === '') {
        $infoColor.addClass('is-hidden');
    }

    // Меняем значение цены на странице категории
    _this.textilFunctions.addEvents.priceChange = function () {
        var $selectSize = $('.select-size');
    
        $selectSize.on('change', function () {
            var id = $(this).attr('data-id'),
                price = $(this).find(':selected').attr('data-price'),
                item_name = this.value;
    
            $('.pr_change_' + id).text(price);
            $('.optionSize_' + id).val(item_name);
        });
    };
    _this.textilFunctions.addEvents.priceChange();


})(jQuery, window);