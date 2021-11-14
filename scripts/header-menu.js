/*$(document).mouseup(function (e){ // событие клика по веб-документу

    if ( $(e.target).closest('label').length 
        && $('input[type=checkbox]').has(e.target).length === 0 
        || $(e.target).closest('.history__menu').length
        || $(e.target).closest('.header__search').length) {
        // клик внутри элемента 
        $("input[type=checkbox]").click(function(){

            if ($(this).is(':checked')) {
                $('input[type=checkbox]').each(function () {
                    $(this).prop("checked", false);
                });
                $(this).prop("checked", true);
            }
            else {
                $('#id input:checkbox').prop('checked', false);
            }  
        });
    }

    else{
        $('input[type=checkbox]').each(function () {
            $(this).prop("checked", false);
        })
    }
});

$(function() {
    $('.menu__link').click( function() {
        $('input[type=checkbox]').each(function () {
            $(this).prop("checked", false);
        });
    });
});
*/

/*$('#buttonSearch').click(function() {
    $('.history__menu').css({ "display": 'none'});
    if( $('#searchInput').css("display") === 'none'){
        $('#searchInput').css({ "display": 'block'});
    }
    else if ( $('#searchInput').css("display") === 'block')
    {
        $('#searchInput').css({ "display": 'none'});
    }
});*/

$(document).mouseup(function (e){ 

    //ПОИСК
    if ( $(e.target).closest('#buttonSearch').length
        || $(e.target).closest('.header__search').length) {

        if( $('.history__menu').css("display") === 'block'){
            $('.history__menu').css({ "display": 'none'});
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
    else if ( ($(e.target).closest('#buttonHistory').length
        || $(e.target).closest('.history__menu').length) 
        && ! $(e.target).closest('.menu__link').length) {

        if( $('#searchInput').css("display") === 'block'){
            $('#searchInput').css({ "display": 'none'});
        }

        if( $('.history__menu').css("display") === 'none'){
            $('.history__menu').css({ "display": 'block'});
        }
        else if ( $('.history__menu').css("display") === 'block')
        {
            $('.history__menu').css({ "display": 'none'});
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
        if( $('.history__menu').css("display") === 'block'){
            $('.history__menu').css({ "display": 'none'});
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
});

$(window).resize(function(){
    if ($(window).width() > 992) {
        $('.nav').css({ "display": 'flex'});
    }
    else if ($(window).width() <= 992) {
        $('.nav').css({ "display": 'none'});
    }
});