/**
* Created with FutureCompilledApp.
* User: ArtemZamuruev
* Date: 2016-07-29
* Time: 03:30 PM
*/

$(document).on("click", "div.mobile__menu__icon", function(){
    var $menu = $("div.menu");
    if ($menu.hasClass("fadeOutUp")){
        $menu.removeClass("fadeOutUp");
        $menu.addClass("fadeInDown");
        return;
    }
    else{
        if($menu.hasClass("fadeInDown")){
            $menu.removeClass("fadeInDown");
            $menu.addClass("fadeOutUp");
            return;
        }
        else{
            return;
        }
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