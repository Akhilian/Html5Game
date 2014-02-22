define(["CONFIG", "view/Tile", "view/Tileset", "maps/Position"], function(CONFIG, Tile, Tileset, Position) {

	function Map() {

		// Characters
		this.characters = [];

		// Map Data : 
		this.mapRaw = undefined;

		// Tile's loader
		this.tilesToLoad = 0;
		this.tilesLoaded = 0;

		// Background and decor tiles
		this.settings = [];
		
		// Block tiles
		this.tiles = [];

		// World dimensions
		this.world = undefined;

		// The process worker will notify any change on the loading process
		this.progressWorker = $.Deferred();
		this.progressWorker.notify("0");
	}

	/**
	 * Return the process monitor from Map that allow to get the map loading state
	 * @return {$.Deffered} Deferred object from jQuery
	 */
	Map.prototype.getLoadingMonitor = function() {
		return this.progressWorker.promise();
	}

	Map.prototype.setRawData = function(data) {

		var tilesetInfos,
			tilesetList = [],
			tmp;

		var totalTilesCount = data.width * data.height,
			tileCount = 0;

		for(var i=0; i< data.tilesets.length; i++) {

			tilesetInfos = data.tilesets[i];

			var tilesetCount = (tilesetInfos.imageheight / CONFIG.TILE_SIZE) * (tilesetInfos.imagewidth / CONFIG.TILE_SIZE);

			tmp = new Tileset(
				tilesetInfos.name,
				tilesetInfos.firstgid,
				tilesetCount
			);

			var loader = tmp.loadTiles();

			tilesetList.push(tmp);
			this.progressWorker.notify( ((i + 1) / data.tilesets.length) * 100);
		}

		var currentLayer;
		for(var j=0; j <  data.layers.length; j++) {
			currentLayer = data.layers[j];
			if(currentLayer.visible === true) {

				var tmpPosition;

				for(var k=0; k < currentLayer.data.length; k++) {

					if(currentLayer.data[k] !== 0) {

						tileCount++;

						tmpPosition = new Position(
							k % data.width,
							Math.floor(k / data.width)
						);

						this.tiles.push(new Tile(tmpPosition));
					}
				}
			}
		}

		/*
		this.mapRaw = data;

		var x = 0, y = 0, item, img;

		for(var i = 0; i < this.mapRaw.field.length ; i++) {
			
			item = this.mapRaw.field[i];

			if( item.x > x )
				x = item.x;

			if( item.y > y )
				y = item.y;
			
			if( ! this.tiles[item.type]) {
			
				img = new Image();
				img.src = 'assets/tile/' + item.type + '.png';
				img.onload = this.tileLoaded.bind(this);
				
				this.tiles[item.type] = new Tile(img);
				this.tiles.length += 1;
				this.tilesToLoad += 1;
			}
		}
		
		for(var j = 0; j < this.mapRaw.setting.length ; j++) {
			
			item = this.mapRaw.setting[j];

			if( item.x > x )
				x = item.x;

			if( item.y > y )
				y = item.y;
			
			if( ! this.tiles[item.type]) {
			
				img = new Image();
				img.src = 'assets/tile/' + item.type + '.png';
				img.onload = this.tileLoaded.bind(this);
				
				this.tiles[item.type] = new Tile(img);
				this.tiles.length += 1;
				this.tilesToLoad += 1;

			}
		}

		this.world = {
			width : x,
			height : y
		};

		*/
	};

	Map.prototype.addTile = function(tile) {
		this.tiles.push(tile);
	};
		
	Map.prototype.addSettings = function(setting) {
		this.settings.push(setting);
	};

	Map.prototype.tileLoaded = function(event) {			
		this.tilesLoaded += 1;
	};

	Map.prototype.drawMenu = function() {
		console.log('On affiche le menu');
	};

	Map.prototype.setCharacters = function(characters) {
		this.characters = characters;
	};

	Map.prototype.clean = function() {
		CONFIG.CONTEXT.clearRect(0,0, CONFIG.CANVAS.width(), CONFIG.CANVAS.height());
	};

	Map.prototype.checkCollision = function(posX, posY) {

			var vp =  Viewport.getInstance();

			var charLeft = posX + vp.viewport.x, charRight = posX + 69 + vp.viewport.x;
			var charBottom = posY + vp.viewport.y, charTop = posX + 96 + vp.viewport.y;
		
			var collision = false;
			
			$.each(this.mapRaw.field, function(k, item) {

	//			if(a.max.x < b.min.x or a.min.x > b.max.x) return false
	//			if(a.max.y < b.min.y or a.min.y > b.max.y) return false

				var r2Left = (item.x * TILE_SIZE),
					r2Right = (item.x * TILE_SIZE) + 69,
					r2Bottom = (item.y * TILE_SIZE),
					r2Top = (item.y * TILE_SIZE) + 69;

				if( ! ( charRight < r2Left || charLeft > r2Right || charTop < r2Bottom || charBottom > r2Top ) )
				{
					collision = item;
					return false;
				}
				else
					collision = false;

			});
			
			return collision;
	};

	Map.prototype.checkVoidBelow = function (posX, posY){
		return ! this.checkCollision(posX, posY - 1);
	};

	return Map;

});