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


$("div.header__menu div.menu").on("scroll", function(e){
    if($("div.header__menu div.menu").hasClass("fadeInDown")){
        e.preventDefault();
    }
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