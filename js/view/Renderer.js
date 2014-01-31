define(["view/Camera", "FpsMonitor", "maps/Viewport"], function(Camera, FpsMonitor, Viewport) {

	function Renderer(character, map) {

		this.character = character;
		this.map = map;

		this.camera = new Camera(map, character);
	}

	/**
	*	@description Start the drawing session.
	*/
	Renderer.prototype.start = function() {

		FpsMonitor.init();
			
		// Bind Renderer object to the render function.
		// It allows manipulation of the fps monitor
		//var rend = render.bind(this);

		this.camera.draw();

/*
		window.requestAnimationFrame(rend);

		function render() {

			FpsMonitor.begin();

			// Clean and render the game
			//this.map.clean();
			//this.character.move();
			//this.map.draw();

			//this.camera.draw();

			FpsMonitor.end();

			var rend = render.bind(this);
			window.requestAnimationFrame(rend);
		};
*/
	};

	return Renderer;

});