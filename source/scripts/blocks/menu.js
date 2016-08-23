let $items = $("a[href^='#']")

$items.on('click', function(evt){
	evt.preventDefault()

	let $this = $(this),
			targetName = $this.attr("href").replace("#", ""),
			$target = $("a[name='"+targetName+"']"),
			currentTop = $(window).scrollTop(),
			scrollTop = currentTop + $target.offset().top

	$('html,body').animate({
		scrollTop: scrollTop
	})
})

$(window).on('scrollend', function(){
	let currentTop = $(this).scrollTop(),
			$blocks = $(".layout__item")

	$blocks.each(function(){
		if($(this).offset().top - $(this).height() / 2 <= currentTop && $(this).offset().top + $(this).height() > currentTop) {
			let target = $(this).find('a[name]').attr('name'),
					$item = $('a[href="#'+target+'"]'),
					$active = $(".-js-selected")

			let activeBG = $(".layout__backgrounds .-js-active")
			let nextBG = $(".layout__backgrounds .-"+target+"")

			activeBG.removeClass("-js-active")
			nextBG.addClass("-js-active")

			$active.removeClass('-js-selected')
			$item.addClass('-js-selected')
		}
	})
})
