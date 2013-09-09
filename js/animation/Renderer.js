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

	/**
	*	Draw the canvas.
	*/
	start : function(character, map) {
		
		function render() {
			map.clean();
			character.move();
			map.draw();
		}
		
		var i = window.setInterval(render, 1000 / FRAME_RATE);

	}
	
}