$(document).ready(function () {

    let initial_el = window.location.hash;

    if ($(initial_el).length > 0) {
        if ($(initial_el).hasClass('input')) {
            hideShow(initial_el);
        }
    } else {
        hideShow('#breakfast');
    }

    $('#b1').click(function () {
        console.log("button clicked");
    });

    $('.tab').click(function (e) {
        window.location.hash = $(this).attr('href');
        initial_el = window.location.hash;
        hideShow(initial_el);
        return false;
    });

    $('#breakfast_button').click(function () {
        hideShow('#breakfast');
    });

    $('#lunch_button').click(function () {
        hideShow('#lunch');
    });

    $('#dinner_button').click(function () {
        hideShow('#dinner');
    });
});

function hideShow(el) {
    $('.box').hide();
    $(el).show();
    $('.tab').removeClass("active");
    $('.tab[href="' + el + '"]').addClass("active");

    if(el === '#breakfast'){
        $('#breakfast_button').attr('disabled', true);
        $('#lunch_button').attr('disabled', false);
        $('#dinner_button').attr('disabled', false);
    }
    else if(el === '#lunch'){
        $('#breakfast_button').attr('disabled', false);
        $('#lunch_button').attr('disabled', true);
        $('#dinner_button').attr('disabled', false);
    }
    else if(el === '#dinner'){
        $('#breakfast_button').attr('disabled', false);
        $('#lunch_button').attr('disabled', false);
        $('#dinner_button').attr('disabled', true);
    }
}






   