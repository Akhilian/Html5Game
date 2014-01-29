/**
 *	Draw the entire world and initiate the viewport system.
 * 
 * @param  {CONFIG} CONFIG
 * @param  {Viewport} Viewport
 * @return {Camera}
 */
define(['CONFIG', 'maps/Viewport', 
			'require',
			'physicsjs',
			'physicsjs/renderers/canvas',
			'physicsjs/bodies/circle',
			'physicsjs/behaviors/constant-acceleration',
			'physicsjs/behaviors/edge-collision-detection',
			'physicsjs/behaviors/body-impulse-response'], function(CONFIG, Viewport, require, Physics) {

	function Camera(map, character) {

		this.map = map;
		this.character = character;

		console.log(this.map);
	}

	Camera.prototype.draw = function() {

		Physics(function(world){
    
		    var viewWidth = window.innerWidth;
		    var viewHeight = window.innerHeight;
		    
		    var renderer = Physics.renderer('canvas', {
		        el: 'viewport',
		        width: viewWidth,
		        height: viewHeight,
		        meta: false, // don't display meta data
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
		    
		    // add the renderer
		    world.add( renderer );
		    // render on each step
		    world.subscribe('step', function(){
		        world.render();
		    });
		    
		    // bounds of the window
		    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
		    
		    // constrain objects to these bounds
		    world.add(Physics.behavior('edge-collision-detection', {
		        aabb: viewportBounds,
		        restitution: 0.99,
		        cof: 0.99
		    }));
		    
		    Physics.body('wheel', 'circle', function( parent ){
		        
		        return {
		            // no need for an init
		            
		            // spin the wheel at desired speed
		            spin: function( speed ){
		                // the wheels are spinning...
		                this.state.angular.vel = speed;
		            }
		        };
		    });
		    
		    var myWheel = Physics.body('wheel', {
		        x: 40,
		        y: 30,
		        radius: 60
		    });
		    
		    world.add( myWheel );
		    
		    // for example, use jquery to listen for a button click, and spin the wheel on the next step
		    $('button').on('click', function(){
		        // wait for the next step before spinning the wheel
		        world.subscribe('step', function( data ){
		            myWheel.spin( 0.03 );
		            // only execute callback once
		            world.unsubscribe( 'step', data.handler );
		        });
		    });
		    
		    // ensure objects bounce when edge collision is detected
		    world.add( Physics.behavior('body-impulse-response') );
		    
		    // add some gravity
		    world.add( Physics.behavior('constant-acceleration') );
		    
		    // subscribe to ticker to advance the simulation
		    Physics.util.ticker.subscribe(function( time, dt ){
		        
		        world.step( time );
		    });
		    
		    // start the ticker
		    Physics.util.ticker.start();
		    
		});

		for(var i = 0; i < this.map.mapRaw.field.length; i++) {
			var item = this.map.mapRaw.field[i];
			console.log(this.map.tiles[item.type]);
		}




		/********************************************************************/

/*
		viewport = Viewport.getInstance().viewport;

		viewport.x = ( this.character.position.x ) - Math.floor(0.3 * viewport.height);

		if( viewport.x < 0 )
			viewport.x = 0;

		if ( viewport.x + viewport.width > ( this.map.world.width * CONFIG.TILE_SIZE ) )
			viewport.x = ( this.map.world.width * CONFIG.TILE_SIZE ) - viewport.width;

		viewport.y = ( this.character.position.y ) - Math.floor(0.3 * viewport.height);

		if( viewport.y < 0 )
			viewport.y = 0;

		for(var i = 0; i < this.map.mapRaw.field.length; i++) {

			var item = this.map.mapRaw.field[i],
				imgTile = this.map.tiles[item.type];

				imgTile.drawAt((item.x * CONFIG.TILE_SIZE) - viewport.x, (item.y * CONFIG.TILE_SIZE) - viewport.y, true);
		}
			
		for(var i = 0; i < this.map.mapRaw.setting.length; i++) {
				
			var item = this.map.mapRaw.setting[i],
				imgTile = this.map.tiles[item.type];

				imgTile.drawAt((item.x * CONFIG.TILE_SIZE) - viewport.x, (item.y * CONFIG.TILE_SIZE) - viewport.y, true);
		}

		this.character.draw();

		Viewport.getInstance().setX(viewport.x);
		*/

	};
	
	return Camera;

});