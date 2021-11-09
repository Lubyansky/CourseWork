$(document).mouseup(function (e){ // событие клика по веб-документу

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


