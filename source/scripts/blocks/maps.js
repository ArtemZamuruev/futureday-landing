window.initMap = function(){
	let $mapContainer = $("#gmap")
	let map
	let styles = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
	let settings = {
		center: {lat: 55.734624, lng: 37.604385},
		zoom: 14
	}
	map = new google.maps.Map($mapContainer[0], settings)
	map.setOptions({styles: styles})

	let marker = new google.maps.Marker({
		position:{lat: 55.734624, lng: 37.604385},
		map: map,
		icon: {
			anchor: {x: 10, y: 20},
			url: './images/map-icon.png',
			scaledSize: {width: 42, height: 39},
			size: {width: 42, height: 39}
		}
	})
}
