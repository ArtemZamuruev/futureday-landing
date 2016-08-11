/**
* Created with FutureCompilledApp.
* User: ArtemZamuruev
* Date: 2016-07-28
* Time: 02:49 PM
*/

$("div.left_switcher").click(function(){
    $("div.speakers__items").addClass("-turned-by-user");
    setTimeout(function(){
        $("div.speakers__items").removeClass("-turned-by-user");
    },10000);
    turnRight();
});
$("div.right_switcher").click(function(){
    $("div.speakers__items").addClass("-turned-by-user");
    setTimeout(function(){
        $("div.speakers__items").removeClass("-turned-by-user");
    },10000);
    turnLeft();
});


$(document).ready(function(){
     $("div.speaker__item").addClass("-destroyed");
    
     var timerId = setTimeout(function tick() {
         if(!$("div.speakers__items").hasClass("-turned-by-user")){
            turnLeft();
         }
     timerId = setTimeout(tick, 15000);
     }, 15000);
//      placeAdditionalSpeakerDesc(); 
});

$(window).resize(function(){
//     placeAdditionalSpeakerDesc();
});

function placeAdditionalSpeakerDesc(){
    var $item = $("div.speaker__item:nth-child(5)"),
        itemTop = parseInt($item.css("top")),
        itemLeft = parseInt($item.css("left"));
    var itemHeight = parseInt($item.height());
    var itemWidth = parseInt($item.width());
    var itemMarLeft = parseInt($item.css("margin-left"));
    var itemMarTop = parseInt($item.css("margin-top"));
    $("div.speaker__desc.hiddenfix").css({
        "position" : "absolute",
        "top" : itemTop+itemMarTop+itemHeight/2-10,
        "left": itemLeft+itemMarLeft+itemWidth+24,
        "opacity" : "1"
    });
        
}

const ANIMATION_DELAY = 500;

const IN_ANIMATION = "slideIn";
const OUT_ANIMATION = "slideOut";

const TEXT_OUT_ANIMATION = "fadeOut";
const TEXT_IN_ANIMATION = "fadeIn";

$(document).on("scroll", function(){
    var currentTop = $(this).scrollTop(),
        $blocks = $(".layout__item"),
        windowHeight = $(window).height(),
        $speakersBlock = $($blocks[1]),
        $speakerItems = $("div.speaker__item");
    if (currentTop+windowHeight*0.6 >= $speakersBlock.offset().top && currentTop+windowHeight*0.4 <= $speakersBlock.offset().top+$speakersBlock.height()){
        $speakerItems.each(function(){
            $(this).removeClass("-destroyed");
        });
        $("div.speaker__desc.hiddenfix").removeClass("-destroyed");
    }
    else{
        $speakerItems.each(function(){
            $(this).addClass("-destroyed");
            $("div.speaker__desc.hiddenfix").addClass("-destroyed");
        });
    }
});

var ItemBuffer = {
    imagesrc : "",
    name: "",
    role: ""
};

function turnLeft(){  
    
    var $speaker_items = $("div.speaker__item");
    var numOfItems = $speaker_items.length;
    var firstItem = $speaker_items[0];
    
    copyPropertiesToBuffer(firstItem, ItemBuffer);    
    for(var i = 1; i < numOfItems; i++){
        var currentItem = $speaker_items[i];
        var prevItem = $speaker_items[i-1];    
        setPropertiesToCard(currentItem, prevItem, "Left");
    }
    
    setPropertiesFromBuffer($speaker_items[numOfItems-1], ItemBuffer, "Left");
}

function turnRight(){
    var $speaker_items = $("div.speaker__item");
    var numOfItems = $speaker_items.length;
    var lastItem = $speaker_items[numOfItems-1];
    copyPropertiesToBuffer(lastItem, ItemBuffer);
    
    for (var i = numOfItems-2; i >= 0; i--){
        var currentItem = $speaker_items[i];
        var nextItem  = $speaker_items[i+1];
        setPropertiesToCard(currentItem, nextItem, "Right");
    }
    setPropertiesFromBuffer($speaker_items[0], ItemBuffer, "Right");
}


function setPropertiesToCard(itemFrom, itemTo, dest){
    animateItemOut($("div.speaker__image", itemTo), dest);
    animateTextOut($("div.speaker__desc", itemTo));
    setTimeout(function(){
        $(".speaker__image", itemTo).css({"background-image": $(".speaker__image", itemFrom).css("background-image")});
        $(".speaker__name", itemTo).html($(".speaker__name", itemFrom).html());
        $(".speaker__role", itemTo).html($(".speaker__role", itemFrom).html());        
    }, ANIMATION_DELAY);
    
    setTimeout(function(){
        animateItemIn($("div.speaker__image", itemTo), dest);
        animateTextIn($("div.speaker__desc", itemTo));
    }, ANIMATION_DELAY);
}
function setPropertiesFromBuffer(itemTo, buffer, dest){
    
    animateItemOut($("div.speaker__image", itemTo), dest);
    animateTextOut($("div.speaker__desc", itemTo));
    animateTextOut($("div.speaker__desc.hiddenfix"));
    setTimeout(function(){
        $(".speaker__image", itemTo).css({"background-image" : buffer.imagesrc});
        $(".speaker__name", itemTo).html(buffer.name);
        $(".speaker__role", itemTo).html(buffer.role);
        $("div.speaker__name","div.speaker__desc.hiddenfix").text($("div.speaker__name", "div.speaker__item:nth-child(5)").text());
        $("div.speaker__role","div.speaker__desc.hiddenfix").text($("div.speaker__role", "div.speaker__item:nth-child(5)").text());
    }, ANIMATION_DELAY);
    
    setTimeout(function(){
        animateItemIn($("div.speaker__image", itemTo), dest);
        animateTextIn($("div.speaker__desc", itemTo));
        animateTextIn($("div.speaker__desc.hiddenfix"));
    }, ANIMATION_DELAY);
    
}
function copyPropertiesToBuffer(itemToCopy, buffer){
    buffer.imagesrc = $(".speaker__image", itemToCopy).css("background-image");
    buffer.name = $(".speaker__name", itemToCopy).html();
    buffer.role = $(".speaker__role", itemToCopy).html();  
}

function getAnotherDest(dest){
    if (dest === "Left"){
        return "Right";
    }
    if (dest === "Right"){
        return "Left";
    }
}

function animateItemOut(item, anDest){
    var altAnDest = getAnotherDest(anDest);
    $(item).removeClass(IN_ANIMATION+anDest);
    $(item).removeClass(IN_ANIMATION+altAnDest);
    $(item).addClass(OUT_ANIMATION+anDest);
}
function animateItemIn(item, anDest){
    var altAnDest = getAnotherDest(anDest);
    $(item).removeClass(OUT_ANIMATION+anDest);
    $(item).removeClass(OUT_ANIMATION+altAnDest);
    $(item).addClass(IN_ANIMATION+altAnDest);
}

function animateTextOut(item){
    $(item).removeClass(TEXT_IN_ANIMATION);
    $(item).addClass(TEXT_OUT_ANIMATION);
}
function animateTextIn(item){
    $(item).removeClass(TEXT_OUT_ANIMATION);
    $(item).addClass(TEXT_IN_ANIMATION);
}