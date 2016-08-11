/**
* Created with FutureCompilledApp.
* User: ArtemZamuruev
* Date: 2016-07-30
* Time: 11:13 AM
* To change this template use Tools | Templates.
*/




$(document).ready(function(){

 new WOW().init();

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