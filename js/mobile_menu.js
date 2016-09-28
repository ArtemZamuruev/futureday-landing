/**
* Created with FutureCompilledApp.
* User: ArtemZamuruev
* Date: 2016-07-29
* Time: 03:30 PM
*/

$(document).on("click", "div.mobile__menu__icon", function(){
    var $menu = $("div.header__menu div.menu");
    $menu.removeClass("fadeOutUp");
    $menu.addClass("fadeInDown");
    $("html,body").css({"overflow":"hidden"});
});

$("div.mobile__menu__close").on("click", function(){
    if($("div.header__menu div.menu").hasClass("fadeInDown")){
        $("div.header__menu div.menu").removeClass("fadeInDown");
        $("div.header__menu div.menu").addClass("fadeOutUp");
        $("html,body").css({"overflow":"auto"});
    }
});

$("div.menu__item a").click(function(){
    if($(window).width()>1024){
        return;
    }
    setTimeout(function(){
        $("div.header__menu div.menu").removeClass("fadeInDown");
        $("div.header__menu div.menu").addClass("fadeOutUp");
        $("html,body").css({"overflow":"auto"});
    }, 300);
});


$(document).ready(function(){
    if($(window).width() > 1024){
        $("div.menu").removeClass("fadeOutUp");
    }
});

$(window).on("resize", function(){
    if($(window).width() <= 1024){
        $("div.menu").addClass("fadeOutUp");
    }
    else{
        $("div.menu").removeClass("fadeOutUp");
    }
});