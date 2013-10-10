var Mapper = {

	loadMap : function(lvl) {
		
		var url = 'js/maps/json/map' + lvl + '.json';
		var data;
	
		$.ajax({
			dataType: "json",
			url: url,
			async : false,
			success: function(d) {
				data = d;
			}
		});
		
		return data;
	},
	
	createMap : function(data) {
		
		$('#map').attr('width', $(window).width());
		$('#map').attr('height', $(window).height());
		
		var map = new Map();
		map.setRawData(data);
		
		return map;
	},
	
	getInitialPosition : function(lvl) {
	
		var url = 'js/maps/json/map' + lvl + '.json';
		var position;
	
		$.ajax({
			dataType: "json",
			url: url,
			async : false,
			success: function(d) {
				position = d.initialPosition;
			}
		});
		
		return position;
	},
	
		
};

function Map() {

	// Characters
	this.characters = new Array();

	// Map Data : 
	this.mapRaw;

	// Tile's loader
	this.tilesToLoad = 0;
	this.tilesLoaded = 0;

	// Background and decor tiles
	this.settings = new Array();
	
	// Block tiles
	this.tiles = new Array();

	// World dimensions
	this.world;
	
	this.addTile = function(tile) {
		this.tiles.push(tile);
	}
	
	this.addSettings = function(setting) {
		this.settings.push(setting);
	}
	
	this.setRawData = function(data) {

		this.mapRaw = data;

		var x = 0, y = 0;

		for(var i = 0; i < this.mapRaw.field.length ; i++) {
			
			var item = this.mapRaw.field[i];

			if( item.x > x )
				x = item.x;

			if( item.y > y )
				y = item.y;
			
			if( ! this.tiles[item.type]) {
			
				var img = new Image();
				img.src = 'assets/tile/' + item.type + '.png';
				img.onload = this.tileLoaded.bind(this);
				
				this.tiles[item.type] = new Tile(img);
				this.tiles.length += 1;
				this.tilesToLoad += 1;
			}
			
		}
		
		for(var i = 0; i < this.mapRaw.setting.length ; i++) {
			
			var item = this.mapRaw.setting[i];

			if( item.x > x )
				x = item.x;

			if( item.y > y )
				y = item.y;
			
			if( ! this.tiles[item.type]) {
			
				var img = new Image();
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
		}
	}
	
	this.tileLoaded = function(event) {
		
		this.tilesLoaded += 1;
		
//		if(this.tilesLoaded == this.tilesToLoad)
//			this.draw();
	}

	
	this.drawMenu = function() {
		console.log('On affiche le menu');
	}
}

Map.prototype.setCharacters = function(characters) {
	this.characters = characters;
};

Map.prototype.clean = function() {
	CONTEXT.clearRect(0,0, CANVAS.width(), CANVAS.height());
}

Map.prototype.checkCollision = function(posX, posY) {

		var vp =  Viewport.getInstance();

		var charLeft = posX + vp.viewport.x, charRight = posX + 69 + vp.viewport.x;
		var charBottom = posY + vp.viewport.y, charTop = posX + 96 + vp.viewport.y;
	
		var collision = false;
		
		$.each(this.mapRaw.field, function(k, item) {

//			if(a.max.x < b.min.x or a.min.x > b.max.x) return false
//			if(a.max.y < b.min.y or a.min.y > b.max.y) return false

			var 	r2Left = (item.x * TILE_SIZE),
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
}