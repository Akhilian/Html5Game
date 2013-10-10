include('FpsMonitor');
include('maps/Viewport');
include('animation/Camera');

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

function Renderer(character, map) {

	this.character = character;
	this.map = map;

	this.camera = new Camera(map, character);

}

/**
*	Draw the canvas.
*/
Renderer.prototype.start = function() {

	FpsMonitor.init();
		
	// Bind Renderer object to the render function.
	// It allows manipulation of the fps monitor
	var rend = render.bind(this);
	window.requestAnimationFrame(rend);

	function render() {

		FpsMonitor.begin();

		// Clean and render the game
		this.map.clean();
		this.character.move();
		//this.map.draw();

		this.camera.draw();

		FpsMonitor.end();

		var rend = render.bind(this);
		window.requestAnimationFrame(rend);
	};

}