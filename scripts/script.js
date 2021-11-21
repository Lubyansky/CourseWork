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
        $('.backdrop').css({ "opacity": '0', "left": '-100%'});
        $('#mobile').each(function () {
            $(this).css({ "display": 'block'});
        });
        $('#desk').each(function () {
            $(this).css({ "display": 'none'});
        });
        $('.history-menu').each(function () {
            $(this).css({ "display": 'none'});
        });
    }
});

$(document).mouseup(function (e){ 

    //ПОИСК
    if ( $(e.target).closest('#buttonControl').length) {

        if( $('.history-menu').css("display") === 'block'){
            $('.history-menu').css({ "display": 'none'});
        }
        
        if ($(window).width() <= '992'){
            if( $('.nav').css("display") === 'flex'){
                $('.nav').css({ "display": 'none'});
                $('.backdrop').css({ "opacity": '0', "left": '-100%'});
                $('.header').css({ "z-index": '0'});
            }
        } 

        if( $('#searchInput').css("display") === 'none'){
            $('#searchInput').css({ "display": 'block'});
            $('#buttonFind').css({ "display": 'block'});
            $('#buttonControl').removeClass('find');
            $('#buttonControl').addClass('close');
            $('.header').css({ "z-index": '100'});
            $('#searchInput').focus();
        }
        else if ( $('#searchInput').css("display") === 'block')
        {
            $("#searchInput").val("");
            $('#searchInput').css({ "display": 'none'});
            $('#buttonFind').css({ "display": 'none'});
            $('#buttonControl').removeClass('close');
            $('#buttonControl').addClass('find');
            $('.header').css({ "z-index": '0'});
        }
    }
    //ПОДМЕНЮ ПЕРИОДЫ
    else if ( ($(e.target).closest('#buttonHistory').length)) {
        if( $('#searchInput').css("display") === 'block'){
            $("#searchInput").val("");
            $('#searchInput').css({ "display": 'none'});
            $('#buttonFind').css({ "display": 'none'});
            $('#buttonControl').removeClass('close');
            $('#buttonControl').addClass('find');
            $('.header').css({ "z-index": '0'});
        }
        if ($(window).width() <= '992'){
            if( $('.nav').css("display") === 'flex'){
                $('.nav').css({ "display": 'none'});
                $('.backdrop').css({ "opacity": '0', "left": '-100%'});
                $('.header').css({ "z-index": '0'});
            }
            document.location.href = "#";
        }
        else if ($(window).width() > '992'){
            if( $('.history-menu').css("display") === 'none'){
                $('.history-menu').css({ "display": 'block'});
                $('.header').css({ "z-index": '100'});
            }
            else if ( $('.history-menu').css("display") === 'block')
            {
                $('.history-menu').css({ "display": 'none'});
                $('.header').css({ "z-index": '0'});
            }
        }

    }
    //БУРГЕР
    else if ( $(e.target).closest('#buttonBurger').length) {

        if( $('#searchInput').css("display") === 'block'){
            $("#searchInput").val("");
            $('#searchInput').css({ "display": 'none'});
            $('#buttonFind').css({ "display": 'none'});
            $('#buttonControl').removeClass('close');
            $('#buttonControl').addClass('find');
            $('.header').css({ "z-index": '0'});
        }

        if( $('.nav').css("display") === 'none'){
            $('.nav').css({ "display": 'flex'});
            $('.backdrop').css({ "opacity": '1', "left": '0'});
            $('.header').css({ "z-index": '101'});
        }
        else if ( $('.nav').css("display") === 'flex')
        {
            $('.nav').css({ "display": 'none'});
            $('.backdrop').css({ "opacity": '0', "left": '-100%'});
            $('.header').css({ "z-index": '0'});
        }
    }
    //ЛЮБАЯ ДРУГАЯ ОБЛАСТЬ
    else{
        if(!($(e.target).closest('.search__input').length 
        || $(e.target).closest('.history-menu').length 
        && !$(e.target).closest('.history-menu__link').length)) {
            if( $('.history-menu').css("display") === 'block'){
                $('.history-menu').css({ "display": 'none'});
                $('.header').css({ "z-index": '0'});
            }
            if( $('#searchInput').css("display") === 'block'){
                $('#searchInput').css({ "display": 'none'});
                $('#buttonFind').css({ "display": 'none'});
                $('#buttonControl').removeClass('close');
                $('#buttonControl').addClass('find');
                $('.header').css({ "z-index": '0'});
            }
            if ($(window).width() <= '992'){
                if( $('.nav').css("display") === 'flex'){
                    $('.nav').css({ "display": 'none'});
                    $('.backdrop').css({ "opacity": '0', "left": '-100%'});
                    $('.header').css({ "z-index": '0'});
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
        console.log("Enter:", value);

        $('#searchInput').css({ "display": 'none'});
        $('#buttonFind').css({ "display": 'none'});
        $('#buttonControl').removeClass('close');
        $('#buttonControl').addClass('find');
    }
});
$('#buttonFind').click(function() {
    var value = $("#searchInput").val();
    $("#searchInput").val("");
    console.log("Enter:", value);
});

//ПОДПИСКА
$('#emailInput').keydown(function(e) {
    if(e.keyCode === 13) {
        var value = $("#emailInput").val();
        $("#emailInput").val("");
        console.log("Enter:", value);
    }
});
$('#buttonSubscribe').click(function() {
    var value = $("#emailInput").val();
    $("#emailInput").val("");
    console.log("Enter:", value);
});