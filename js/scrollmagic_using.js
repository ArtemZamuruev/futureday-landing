/**
* Created with FutureLanding.
* User: ArtemZamuruev
* Date: 2016-08-29
* Time: 09:13 AM
* To change this template use Tools | Templates.
*/


const vh = $(window).height();

var controller = new ScrollMagic.Controller();

$(document).ready(function(){
    $(getBackgroundForSection("intro__layout")).css({
        "opacity" : 1
    });
});

var sectionsList = {
    "speakers__layout": {
        prev: "intro__layout",
        next: "forwho__layout",
        rus_name: "Спикеры"
    },
    "forwho__layout" : {
        prev: "speakers__layout",
        next: "advantages__layout",
        rus_name: "Для кого"
    },
    "advantages__layout" : {
        prev: "forwho__layout",
        next: "shedule__layout",
        rus_name: "Что вы получите"
    },
    "shedule__layout" : {
        prev: "advantages__layout",
        next: "tickets__layout",
        rus_name: "Программа"
    },
    "tickets__layout" : {
        prev: "shedule__layout",
        next: "place__layout",
        rus_name: "Билеты"
    },
    "place__layout" : {
        prev: "tickets__layout",
        next: "contacts__layout",
        rus_name: "Место"
    },
    "contacts__layout" : {
        prev: "place__layout",
        next: "",
        rus_name: "Контакты"
    }
};

$(document).ready(initScenes);
$(document).ready(initMenuIndicationScenes);

function getBackgroundForSection(sectionSelector){
    var backgroundName = "div.layout__background.-" + sectionSelector.replace("__layout", "");
    return backgroundName;
}

function initScenes(){
    for (secName in sectionsList){
        var a_duration = parseFloat(vh/2.0);
        var a_offset = parseFloat(vh/-4.0);
        
        if (secName === "place__layout"){
            a_duration = parseFloat(vh/1.3);
        }
        var tmpScene = new ScrollMagic.Scene({
            triggerElement: "div."+secName,
            duration:       a_duration,
            offset:         a_offset
        })
        .setTween(getBackgroundForSection(secName), {opacity : 1})
        .addTo(controller);
        
        var tmpScene2 = new ScrollMagic.Scene({
            triggerElement: "div."+secName,
            duration:       a_duration,
            offset:         a_offset
        })
        .setTween(getBackgroundForSection(sectionsList[secName].prev), {opacity : 0})
        .addTo(controller);
    }
}


function addIndicationScene(trigger, h_block, text, menu_index, nav_index){
    var mobileIndication =  new ScrollMagic.Scene({
        triggerElement: trigger,
        duration: $(h_block).outerHeight(),
        offset: 100
    })
    .on('enter leave', function(){
        $("div.current__menu__indicator").text(text);
    })
    .addTo(controller); 
    var desktopIndication = new ScrollMagic.Scene({
        triggerElement: trigger,
        duration: $(h_block).outerHeight(),
        offset: 0
    })
    .on('enter leave', function(){
        $("a.menu__link.-js-selected").removeClass("-js-selected");
        $("div.menu__item:nth-child("+menu_index+") a.menu__link").addClass("-js-selected");
    })
    .addTo(controller);
    
    
    var desktopIndicationDots = new ScrollMagic.Scene({
        triggerElement: trigger,
        duration: $(h_block).outerHeight(),
        offset: 0
    })
    .on('enter leave', function(){
        $("a.nav__item.-js-selected").removeClass("-js-selected");
        $("a.nav__item:nth-child("+nav_index+")").addClass("-js-selected");
    })
    .addTo(controller);}

function initMenuIndicationScenes(){   
    
    var buildAdvantagesSection = new ScrollMagic.Scene({
        triggerElement: "div.advantages__layout",
        duration: $("div.advantages__layout").outerHeight()+300,
        offset: -150
    })
    .on("enter", function(){
        $("div.advantages__item").removeClass("-destroyed");
    })
    .addTo(controller);
    
    addIndicationScene("div.intro__layout", "div.intro", "", -1, 1);
    addIndicationScene("div.speakers__layout", "div.speakers__layout", "Спикеры", 3, 2);
    addIndicationScene("div.forwho__layout", "div.forwho__layout", "Для кого", 4, 3);
    addIndicationScene("div.advantages__layout", "div.advantages__layout", "Что вы получите", 5, 4);
    addIndicationScene("div.shedule__layout", "div.shedule__layout", "Программа", 6, 5);
    addIndicationScene("div.tickets__layout", "div.tickets__layout", "Билеты", 7, 6);
    addIndicationScene("div.place__layout", "div.place__layout", "Место", 8, 7);
    addIndicationScene("div.contacts__layout", "div.contacts__layout", "Контакты", 9, 8);
}
