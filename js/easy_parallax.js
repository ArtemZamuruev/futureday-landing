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
        prevCursorCords.x = event.pageX;
        prevCursorCords.y = event.pageY;
    }
    
    currentCursorCords.x = event.pageX;
    currentCursorCords.y = event.pageY;
    
    var shiftTop = parseFloat((currentCursorCords.y - prevCursorCords.y)/-125);
    var shiftLeft = parseFloat((currentCursorCords.x - prevCursorCords.x)/-125);
    
    var $icons = $("div.shedule__icon-back");
    
    $icons.each(function(){
        $(this).css({
            "top": parseFloat($(this).css("top")) + shiftTop,
            "left": parseFloat($(this).css("left")) + shiftLeft
        });
    });
    

    //console.log("clientX="+event.clientX+"; clientY="+event.clientY);
    //console.log("shiftTop="+shiftTop+"; shiftLeft="+shiftLeft);
    
    prevCursorCords.x = event.pageX;
    prevCursorCords.y = event.pageY;
    
    //console.log("Offset: top="+$($testItem).offset().top+"; left="+$($testItem).offset().left);
    //console.log("Position: top="+$($testItem).position().top+"; left="+$($testItem).position().left);
});