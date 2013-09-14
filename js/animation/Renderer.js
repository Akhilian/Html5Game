include('FpsMonitor');

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

		FpsMonitor.init();
		
		// Bind Renderer object to the render function.
		// It allows manipulation of the fps monitor
		var rend = render.bind(this);
		window.requestAnimationFrame(rend);

		function render() {

			FpsMonitor.begin();

			// Clean and render the game
			map.clean();
			character.move();
			map.draw();

			FpsMonitor.end();

			var rend = render.bind(this);
			window.requestAnimationFrame(rend);
		};

	}
	
}