define(['CONFIG', 'maps/Viewport'], function(CONFIG, Viewport) {

	function Camera(map, character) {
		this.map = map;
		this.character = character;
	}

	Camera.prototype.draw = function() {

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

	};
	
	return Camera;

});