/**
* Created with FutureLanding.
* User: ArtemZamuruev
* Date: 2016-08-23
* Time: 04:47 PM
* 
*/

var sectionsParameters = {}

var viewport = {
    height: parseFloat($(window).height()),
    
    curScrTop: 0.0,
    prevScrTop: 0.0,
    
    scrCenter: 0.0,
    scrBottom: 0.0,
    
    topSection: "",
    ctrSection: "",
    botSection: ""
}


$(document).ready(initSectionsParameters);

$(document).on("scroll", function(){
    updateViewport();
    resetAllBackgroundsExceptVisible();
    
//     console.log("top: "+viewport.topSection+"; center: "+viewport.ctrSection+"; bottom: "+viewport.botSection);
//     if (viewport.botSection === viewport.ctrSection && viewport.ctrSection === viewport.topSection){
//         console.log("Viewport is inside one section: "+viewport.ctrSection);
//         updatePrevViewport();
//         return;
//     }
    
    //Handle top section:
//     var opacityTop = parseFloat((sectionsParameters[viewport.topSection].offset_bot - viewport.curScrTop)/sectionsParameters[viewport.topSection].height);
//     var opacityBottom = parseFloat((viewport.scrBottom - sectionsParameters[viewport.botSection].offset_bot)/sectionsParameters[viewport.botSection].height);
//     var opacityCenter = parseFloat((viewport.scrCenter - sectionsParameters[viewport.ctrSection].offset_top)/(sectionsParameters[viewport.ctrSection].offset_bot - viewport.scrCenter));
//     setSectionBackgroundOpacity(viewport.topSection, Math.abs(opacityTop));
//     setSectionBackgroundOpacity(viewport.botSection, Math.abs(opacityBottom));
//     setSectionBackgroundOpacity(viewport.ctrSection, Math.abs(opacityCenter));
    
    
    updatePrevViewport();    
});

function resetAllBackgroundsExceptVisible(){
    for (sectionName in sectionsParameters){
        var currentSection = sectionsParameters[sectionName];
        if (viewport.botSection != sectionName && viewport.topSection != sectionName && viewport.ctrSection != sectionName){
            setSectionBackgroundOpacity(sectionName, 0);
        }
    }
}

function setSectionBackgroundOpacity(sectionSelector, opacityValue){
    var $background = getBackgroundForSection("div."+sectionSelector);
    $background.css({
        "opacity": parseFloat(opacityValue)
    });
}

function updateViewport(){
    viewport.height = $(window).height();
    viewport.curScrTop = $(window).scrollTop();
    viewport.scrBottom = viewport.curScrTop + viewport.height;
    viewport.scrCenter = viewport.curScrTop + viewport.height/2;
    updateSectionsInViewport();
}
function updatePrevViewport(){
    viewport.prevScrTop = $(window).scrollTop();
}

function updateSectionsInViewport(){
    for (sectionName in sectionsParameters){
        var currentSection = sectionsParameters[sectionName];
        if (viewport.scrCenter > currentSection.offset_top && viewport.scrCenter < currentSection.offset_bot){
            viewport.ctrSection = sectionName;
        }
        if (viewport.scrBottom > currentSection.offset_top && viewport.scrBottom < currentSection.offset_bot){
            viewport.botSection = sectionName;
        }
        if (viewport.curScrTop > currentSection.offset_top && viewport.curScrTop < currentSection.offset_bot){
            viewport.topSection = sectionName;
        }
    }
}

function getScrollDestination(){
    return viewport.curScrTop - viewport.prevScrTop > 0 ? "down" : "up";
}

/*
 *  Для корректной работы функций initSectionsParameters и
 *  getBackgroundForSection необходимо, чтобы специфичный 
 *  для каждой секции класс находился на втором месте 
 *  в перечне классов div'a
 *  
 */

function initSectionsParameters(){   
    updateViewport();
    var $sections = $("div.layout__item"),
        i = 0;
    for (i = 0; i <$sections.length; i++){
        sectionsParameters[$($sections[i]).attr("class").split(" ")[1].toString()] = {
            offset_top : $($sections[i]).offset().top,
            offset_bot : $($sections[i]).offset().top + $($sections[i]).outerHeight(),
            height : $($sections[i]).outerHeight(),
            index : i
        }
    }
}

function getBackgroundForSection(sectionSelector){
    $section = $(sectionSelector);
    var backgroundName = $($section).attr("class");
    backgroundName = "-"+backgroundName.split(" ")[1];
    backgroundName = "div.layout__background." + backgroundName.replace("__layout", "");
    return $(backgroundName);
}