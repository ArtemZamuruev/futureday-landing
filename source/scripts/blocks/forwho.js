let $forWho_items = $(".forwho__menu-item")
let transitionEnd = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd'

$forWho_items.on('click', function(){
	let $this = $(this),
			$active = $(".-js-active[data-slider-target]"),
			$currentSlide = $(".forwho__main-item.-js-active"),
			$target = $(`[data-slider-name="${$this.data('slider-target')}"]`)

	$active.removeClass('-js-active')

	$currentSlide.addClass('-js-out')
	$currentSlide.on(transitionEnd, function(){
		$(this)
			.removeClass('-js-out')
			.off(transitionEnd)
	})
	$currentSlide.removeClass('-js-active')

	$this.addClass('-js-active')
	$target.addClass('-js-active')
})
