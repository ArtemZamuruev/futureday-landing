/**
* Created with FutureByShmakov.
* User: ArtemZamuruev
* Date: 2016-08-12
* Time: 01:39 PM
*/

var prevCursorCords = {
    x: 0,
    y: 0
};
var currentCursorCords = {
    x: 0,
    y: 0
}

$(document).on("mousemove", function(event){
    
    if (prevCursorCords.x == 0 && prevCursorCords.y == 0){
        prevCursorCords.x = event.clientX;
        prevCursorCords.y = event.clientY;
    }
    
    currentCursorCords.x = event.clientX;
    currentCursorCords.y = event.clientY;
    
    var shiftTop = parseFloat((currentCursorCords.y - prevCursorCords.y)/-175);
    var shiftLeft = parseFloat((currentCursorCords.x - prevCursorCords.x)/-175);
    
    if(Math.abs(shiftTop) > 5 || Math.abs(shiftLeft) > 5){
        return;
    }
    
    var $icons = $("div.shedule__icon-back");
    
    $icons.each(function(){
        $(this).css({
            "top": parseFloat($(this).css("top")) + shiftTop,
            "left": parseFloat($(this).css("left")) + shiftLeft
        });
    });
    
    prevCursorCords.x = event.clientX;
    prevCursorCords.y = event.clientY;
    
});