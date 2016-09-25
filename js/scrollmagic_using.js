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
        next: "forwho__layout"
    },
    "forwho__layout" : {
        prev: "speakers__layout",
        next: "advantages__layout"
    },
    "advantages__layout" : {
        prev: "forwho__layout",
        next: "shedule__layout"
    },
    "shedule__layout" : {
        prev: "advantages__layout",
        next: "tickets__layout"
    },
    "tickets__layout" : {
        prev: "shedule__layout",
        next: "place__layout"
    },
    "place__layout" : {
        prev: "tickets__layout",
        next: "contacts__layout"
    },
    "contacts__layout" : {
        prev: "place__layout",
        next: ""
    }
};

$(document).ready(initScenes);

function getBackgroundForSection(sectionSelector){
    var backgroundName = "div.layout__background.-" + sectionSelector.replace("__layout", "");
    return backgroundName;
}

function initScenes(){
    for (secName in sectionsList){
        if (secName === "intro__layout"){
            continue;
        }
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
