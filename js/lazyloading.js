/*
* Created with FutureDay.
* User: ArtemZamuruev
* Date: 2016-08-21
* Time: 01:00 PM
*/

/*-------------------------------------
 * Скроллзависимая анимация         |
 *-------------------------------------
 */
$(document).on("scroll", function(){   
    //Если секция СПИКЕРЫ входит во вьюпорт
    if(doesSectionEnteringViewport("div.speakers__layout", 0.5)){
        itemsBuild("div.speaker__item");
    }
    else{
        itemsDestroy("div.speaker__item");
    }    
    //Если секция ЧТО ВЫ ПОЛУЧИТЕ входит во вьюпорт
    if(doesSectionEnteringViewport("div.advantages__layout", 0.5)){
        itemsBuild("div.advantages__item");
    }
    else{
        itemsDestroy("div.advantages__item");
    }
});

function doesSectionEnteringViewport(sectionSelector, enterCoef){
    var $section = $(sectionSelector),
        currentTop = $(this).scrollTop(),
        windowHeight = $(window).height();
    enterCoef = parseFloat(enterCoef);
    return currentTop+windowHeight*enterCoef >= $section.offset().top && currentTop+windowHeight*(1-enterCoef) <= $section.offset().top+$section.height();
}
function itemsDestroy(itemsSelector){
    var $items = $(itemsSelector);
    if ($items){
        $items.each(function(){
            $(this).addClass("-destroyed");
        });
    }
}
function itemsBuild(itemsSelector){
    var $items = $(itemsSelector);
    if ($items){
        $items.each(function(){
            $(this).removeClass("-destroyed");
        });
    }
}


/*-------------------------------------
 * Анимация элементов на главной    |
 * ------------------------------------
 */
$(document).ready(function(){

//  new WOW().init();

    scrollTo(0, $("body").height);

    setTimeout(function(){
        
        $("div.layout__background.-intro").addClass("-js-active");
        $("div.intro__day").addClass("-sliced");
        setTimeout(function(){
            $(".intro__header").addClass("-sliced");
            $(".intro__label").addClass("-sliced");
            $(".intro__desc").addClass("-sliced");
            setTimeout(function(){
                $(".intro__buy").addClass("-faded");
                setTimeout(function(){
                    $(".layout__header").addClass("-sliced");
                    $(".layout__footer").addClass("-sliced");
                    setTimeout(function(){
                        $(".layout__nav").addClass("-sliced");
                    }, 500);
                }, 1000);

            }, 1000);

        }, 1000);

    }, 1000);
});