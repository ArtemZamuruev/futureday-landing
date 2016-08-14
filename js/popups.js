/**
* Created with FutureCompilledApp.
* User: ArtemZamuruev
* Email: artem.zamuruev@gmail.com
* Date: 2016-08-01
* Time: 09:45 AM
*/

$("div.speaker__item").on("click", function(){
    $("body").addClass("overflow_hidden");
    $("div.popup__speaker__photo").css({"background-image": $("div.speaker__image",this).css("background-image")});
    $("h1.popup__speaker__name").text($("div.speaker__name", this).text());
    $("h3.popup__speaker__role").text($("div.speaker__role", this).text());
    
    $("div.popup__layout").removeClass("-no-visible");
    $("div.popup__content").removeClass("-no-visible");
    $("div.popup__layout").addClass("-visible");  
    $("div.popup__content").addClass("-visible");
      setTimeout(function(){
         $("div.popup__container").height(800);
         $("div.popup__container").height($("div.popup__content").height()-70);
         $(".popup__container").mCustomScrollbar({
             axis:"y",
             setHeight: $("div.popup__content").height()-70
         });
      }, 30);
});

$("div.popup__close__button").on("click", hidePopup);
$("div.popup__layout").on("click", hidePopup);


function hidePopup(){
    $("div.popup__layout").removeClass("-visible");
    $("div.popup__content").removeClass("-visible");
    $("div.popup__layout").addClass("-no-visible");
    $("div.popup__content").addClass("-no-visible");
    $("body").removeClass("overflow_hidden");
//      $("div.popup__container").height(800);
}

$(window).on("resize", function(){
//     $("div.popup__container").height(800);
//     $("div.popup__container").height($("div.popup__content").height()-70);    
});