if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( callback, element ) {

			window.setTimeout( callback, 1000 / FRAME_RATE );

		};

	} )();

}

var Renderer = {

	start : function(character, map) {
		
		function t() {
			character.move();
			map.draw();
		}
		
		var i = window.setInterval(t, 1000 / FRAME_RATE);

	}
	
}