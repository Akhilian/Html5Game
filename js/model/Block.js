/**
 * Defining the block element. A block element is the basic brick to build the world.
 * 
 * @param  {RequireJS} require
 * @param  {PhysicsJS} Physics
 * @return {PhysicsBody}
 */
define(['require','physicsjs','physicsjs/bodies/convex-polygon'], function(require,Physics) {

		var defaults = {
			vertices: [
				{x: 0, y: 70},
				{x: 70, y: 70},
				{x: 70, y: 0},
				{x: 0, y: 0}
			],
			fixed:true
		};

		Physics.body('block', 'convex-polygon', function(parent){
			
			// Setting the basic image for a block
			var basicBlock = new Image();
			basicBlock.src = 'assets/tile/grassCenter.png';

			return {
				init: function(options) {

					options = Physics.util.extend({}, defaults, options);

					parent.init.call(this, options);
					this.view = basicBlock;
				}
			};

		});

	}
);