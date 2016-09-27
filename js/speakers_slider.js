/**
* Created with FutureCompilledApp.
* User: ArtemZamuruev
* Date: 2016-07-28
* Time: 02:49 PM
*/

var removeTurnedByUserFlagTimer;
var automattedTurningTimer;

$("div.left_switcher").click(function(){
    setTurnedByUserFlag();
    turnRight();
});
$("div.right_switcher").click(function(){
    setTurnedByUserFlag()
    turnLeft();
});

function setTurnedByUserFlag(){
    $("div.speakers__items").addClass("-turned-by-user");
    clearTimeout(removeTurnedByUserFlagTimer);
    removeTurnedByUserFlagTimer = setTimeout(function(){
        $("div.speakers__items").removeClass("-turned-by-user");
        clearTimeout(automattedTurningTimer);
    },10000);    
}

$(document).ready(function(){
    let windowWidth = $(window).width();
    if(windowWidth <= 1024){
        setSizes(windowWidth, true);
    }
    
    $("div.speaker__item").addClass("-destroyed");

    var automattedTurningTimer = setTimeout(function tick() {
        if(!$("div.speakers__items").hasClass("-turned-by-user")){
            turnLeft();
        }
        automattedTurningTimer = setTimeout(tick, 15000);
    }, 15000);
});

$(window).on("resize", function(){
    let windowWidth = $(window).width();
    if(windowWidth<=1024){
        console.log("Resize less then 1024");
        setSizes(windowWidth, false);
    }
    else{
        console.log("Resize more then 1024");
        setImagesDefaults();
    }
});


const ANIMATION_DELAY = 1000;

const IN_ANIMATION = "slideIn";
const OUT_ANIMATION = "slideOut";

const TEXT_OUT_ANIMATION = "fadeOut";
const TEXT_IN_ANIMATION = "fadeIn";

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
    
    //Начать анимацию исчезания надписи и фотографии
    animateItemOut($("div.speaker__image", itemTo), dest);
    animateTextOut($("div.speaker__desc", itemTo));
    
    //По исчезновению фото и надписи изменить их CSS-свойства
    setTimeout(function(){
        $(".speaker__image", itemTo).css({"background-image": $(".speaker__image", itemFrom).css("background-image")});
        $(".speaker__name", itemTo).html($(".speaker__name", itemFrom).html());
        $(".speaker__role", itemTo).html($(".speaker__role", itemFrom).html());        
    }, ANIMATION_DELAY);
    
    //Запустить анимацию появления фото и подписи
    setTimeout(function(){
        animateItemIn($("div.speaker__image", itemTo), dest);
        animateTextIn($("div.speaker__desc", itemTo));
    }, ANIMATION_DELAY);
}
function setPropertiesFromBuffer(itemTo, buffer, dest){
    
    //Начать анимацию исчезания надписи и фотографии
    animateItemOut($("div.speaker__image", itemTo), dest);
    animateTextOut($("div.speaker__desc", itemTo));
    
    //По исчезновению фото и надписи изменить их CSS-свойства
    setTimeout(function(){
        $(".speaker__image", itemTo).css({"background-image" : buffer.imagesrc});
        $(".speaker__name", itemTo).html(buffer.name);
        $(".speaker__role", itemTo).html(buffer.role);
    }, ANIMATION_DELAY);
    
    //Запустить анимацию появления фото и подписи
    setTimeout(function(){
        animateItemIn($("div.speaker__image", itemTo), dest);
        animateTextIn($("div.speaker__desc", itemTo));
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


function setImagesDefaults(){
    $("div.speaker__item:nth-child(1) div.speaker__image").css({
        "width" :   "186px",
        "height":   "161px"
    });
    $("div.speaker__item:nth-child(2) div.speaker__image").css({
        "width" :   "410px",
        "height":   "334px"
    });
    $("div.speaker__item:nth-child(3) div.speaker__image").css({
        "width" :   "253px",
        "height":   "296px"
    });
    $("div.speaker__item:nth-child(4) div.speaker__image").css({
        "width" :   "192px",
        "height":   "162px"
    });$("div.speaker__item:nth-child(5) div.speaker__image").css({
        "width" :   "186px",
        "height":   "158px"
    });$("div.speaker__item:nth-child(6) div.speaker__image").css({
        "width" :   "199px",
        "height":   "161px"
    });
}


function setOffset(){
//     alert("Set offset! Window width: "+$(window).width()+"; height: "+$(window).height());
    $("div.speakers__switcher").offset({
        "left": $("div.speaker__item:nth-child(5) div.speaker__image").offset().left
    });
}

function setSizes(wdth, do_set_offset){
    //Make screen-relative sizes of images  
    let props = {
        0: {
            w_per: 0,
            W_to_H: 0
        },
        1: {
            w_per: 0.661,
            W_to_H: 1.2225
        },
        2: {
            w_per: 0.453,
            W_to_H: 0.8554
        },
        3: {
            w_per: 0.309,
            W_to_H: 1.2222
        },
        4: {
            w_per: 0.286,
            W_to_H: 1.1582
        },
        5: {
            w_per: 0,
            W_to_H: 0
        }
    }
    var skr_item_images = $("div.speaker__item div.speaker__image");
    for (var i = 1; i < skr_item_images.length; i++){
        var $curImage = skr_item_images[i];
        var newWidth = parseFloat(wdth*props[i].w_per);
        var newHeight = parseFloat(newWidth / props[i].W_to_H);
        $($curImage).css({
            "width" : newWidth+"px",
            "height": newHeight+"px"
        });
    }
    
    if(do_set_offset){
        setOffset();
    }
}