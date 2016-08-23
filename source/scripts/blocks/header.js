$(window).on('scroll', function(){
	if($(this).scrollTop() > 0) {
		$(".header").addClass('-js-inner')
	} else {
		$(".header").removeClass('-js-inner')
	}
})
