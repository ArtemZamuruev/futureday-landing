/**
* Created with FutureByShmakov.
* User: ArtemZamuruev
* Date: 2016-08-22
* Time: 12:22 PM
*/

$(document).ready(function(){
    setAnchorPosition("div.forwho__layout", "div.forwho__menu-item[data-slider-target=scient]");
    setAnchorPosition("div.tickets__layout", "div.tickets__item:nth-child(1) div.tickets__desc");
    setAnchorPosition("div.place__layout", "div.place__map");
});

function setAnchorPosition(sectionSelector, contentSelector){
    var $anchor = $("a:first-child", sectionSelector),
        $content = $(contentSelector),
        $section = $(sectionSelector),
        vh = parseFloat($(window).height()),
        ch = parseFloat($(contentSelector).outerHeight()),
        sh = parseFloat($(sectionSelector).outerHeight()),
        cof = parseFloat($(contentSelector).offset().top),
        sof = parseFloat($(sectionSelector).offset().top),
        hh = parseFloat($("header.header").outerHeight()),
        anShift = 0;
    console.log($content);
    if((cof-sof)+ch/2.0 > (vh+hh)/2.0){
        anShift = (vh + hh) / 2.0 - ch / 2.0 - (cof - sof);
        anShift = anShift * (-1);
    }
    else{
        anShift = (cof-sof) + ch/2.0 - (vh + hh)/2.0;
    }
    
    console.log($anchor.attr("name")+": "+anShift);
    $anchor.css({
       "top" : anShift
    });
}