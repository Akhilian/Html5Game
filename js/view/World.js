/**
 * Custom World class. Used to create and manage the PhysicsJS's world object.
 * @return {[type]} [description]
 */
define(['require', 'physicsjs', 'CONFIG'], function(require, PhysicsJS, CONFIG) {

	function World(game) {
		this.game = game;
		this.world = PhysicsJS(init);
	}

	//TODO Define a addBody method
	World.prototype.addBody = function() {};

	//TODO Define a removeBody method
	World.prototype.removeBody = function() {};

	/**
	 * Constructor to create a world.	
	 *
	 * @private
	 * @return {function} Function used to create the world.
	 */
	var init = function(world, PhysicsJS) {

		var viewWidth = window.innerWidth;
		var viewHeight = window.innerHeight;

		/***************************************************
			RENDERER DEFINITION
		****************************************************/

		// Creation du Renderer
		var renderer = Physics.renderer('canvas', {

			// <canvas>'s ID
			el: CONFIG.ELEMENT,
			
			// Canvas dimensions
			width: viewWidth,
			height: viewHeight,
			
			// No meta data
			meta: false, // don't display meta data
			
			// Style
			styles: {
				// set colors for the circle bodies
				'circle' : {
					strokeStyle: 'hsla(60, 37%, 17%, 1)',
					lineWidth: 1,
					fillStyle: 'hsla(60, 37%, 57%, 0.8)',
					angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
				}
			}
		});

		world.add( renderer );

		// render on each step
		world.subscribe('step', function(){
			world.render();
		});

		/***************************************************
			WORLD BOUNDARIES
		****************************************************/
	
	};

	return World;

});