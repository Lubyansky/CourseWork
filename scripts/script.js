//ДОБАВИТЬ СЛАЙДЕРЫ
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.best__slider', {
        loop: true,
        swipe: false
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.history__slider-desk', {
        loop: true,
        swipe: false
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.history__slider-mobile', {
        loop: true,
        swipe: false
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.culture__slider-desk', {
        loop: true,
        swipe: false
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.culture__slider-mobile', {
        loop: true,
        swipe: false
    });
});
//УБРАТЬ/ПОКАЗАТЬ НАВИГАЦИЮ ПРИ ИЗМЕНЕНИИ РАЗМЕРОВ ОКНА
$(window).resize(function(){
    if ($(window).width() > 992) {
        $('.nav').css({ "display": 'flex'});
        $('#mobile').each(function () {
            $(this).css({ "display": 'none'});
        });
        $('#desk').each(function () {
            $(this).css({ "display": 'block'});
        });
    }
    else if ($(window).width() <= 992) {
        $('.nav').css({ "display": 'none'});
        $('#mobile').each(function () {
            $(this).css({ "display": 'block'});
        });
        $('#desk').each(function () {
            $(this).css({ "display": 'none'});
        });
    }
});

//НАВИГАЦИЯ
$(document).mouseup(function (e){ 

    //ПОИСК
    if ( $(e.target).closest('#buttonSearch').length) {

        if( $('.history-menu').css("display") === 'block'){
            $('.history-menu').css({ "display": 'none'});
        }
        
        if ($(window).width() <= '992'){
            if( $('.nav').css("display") === 'flex'){
                $('.nav').css({ "display": 'none'});
            }
        } 

        if( $('#searchInput').css("display") === 'none'){
            $('#searchInput').css({ "display": 'block'});
        }
        else if ( $('#searchInput').css("display") === 'block')
        {
             $('#searchInput').css({ "display": 'none'});
        }
    }
    //ПОДМЕНЮ ПЕРИОДЫ
    else if ( ($(e.target).closest('#buttonHistory').length)) {

        if( $('#searchInput').css("display") === 'block'){
            $('#searchInput').css({ "display": 'none'});
        }

        if( $('.history-menu').css("display") === 'none'){
            $('.history-menu').css({ "display": 'block'});
        }
        else if ( $('.history-menu').css("display") === 'block')
        {
            $('.history-menu').css({ "display": 'none'});
        }
    }
    //БУРГЕР
    else if ( $(e.target).closest('#buttonBurger').length) {

        if( $('#searchInput').css("display") === 'block'){
            $('#searchInput').css({ "display": 'none'});
        }

        if( $('.nav').css("display") === 'none'){
            $('.nav').css({ "display": 'flex'});
        }
        else if ( $('.nav').css("display") === 'flex')
        {
            $('.nav').css({ "display": 'none'});
        }
    }
    //ЛЮБАЯ ДРУГАЯ ОБЛАСТЬ
    else{
        if(!($(e.target).closest('.header__search').length 
        || $(e.target).closest('.history-menu').length 
        && !$(e.target).closest('.history-menu__link').length)) {
            if( $('.history-menu').css("display") === 'block'){
                $('.history-menu').css({ "display": 'none'});
            }
            if( $('#searchInput').css("display") === 'block'){
                $('#searchInput').css({ "display": 'none'});
            }
            if ($(window).width() <= '992'){
                if( $('.nav').css("display") === 'flex'){
                    $('.nav').css({ "display": 'none'});
                }
            } 
        }
    }
});

//ПОЛЕ ПОИСКА
$('#searchInput').keydown(function(e) {
    if(e.keyCode === 13) {
        var value = $("#searchInput").val();
        $("#searchInput").val("");
        console.log("Clicked", value);
    }
});

//ПОДПИСКА
$('#emailInput').keydown(function(e) {
    if(e.keyCode === 13) {
        var value = $("#emailInput").val();
        $("#emailInput").val("");
        console.log("Clicked", value);
    }
});
$('#buttonSubscribe').click(function() {
    var value = $("#emailInput").val();
    $("#emailInput").val("");
    console.log("Clicked", value);
});