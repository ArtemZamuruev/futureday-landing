/**
* Created with FutureLanding.
* User: ArtemZamuruev
* Date: 2016-08-23
* Time: 04:47 PM
* 
*/

var viewportHeight = $(window).height();

$(document).on("scroll", function(){
    var $sections = $("div.layout__item"),
        currentTop = $(this).scrollTop(),
        i = 0;
    for (i = 0, i < $sections.length; i++){
        ;
    }
});

/*
 *  Для корректной работы этой функции необходимо,
 *  что бы специфичный для каждой секции класс находился
 *  на втором месте в перечне классов div'a
 *  
 */

function getCurrentSection(){
    
}

function getBackgroundForSection($section){
    var backgroundName = $($section).attr("class").split(" ")[1];
    backgroundName = "-"+backgroundName.replace("__layout", "");
    console.log("backgroundName = "+backgroundName);
    return $("div.layout__background."+backgroundName);
}