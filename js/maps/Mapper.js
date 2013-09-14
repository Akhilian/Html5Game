

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
	
	checkCollision : function(posX, posY, lvl) {

		var charLeft = posX, charRight = posX + 69;
		var charBottom = posY, charTop = posX + 96;
	
		var data = this.loadMap(lvl);
		var field = data.field;
		
		var collision = false;
		
		$.each(field, function(k, v) {

//			if(a.max.x < b.min.x or a.min.x > b.max.x) return false
//			if(a.max.y < b.min.y or a.min.y > b.max.y) return false

			var 	r2Left = (v.x * TILE_SIZE),
					r2Right = (v.x * TILE_SIZE) + 69,
					r2Bottom = (v.y * TILE_SIZE),
					r2Top = (v.y * TILE_SIZE) + 69;

			if( ! ( charRight < r2Left || charLeft > r2Right || charTop < r2Bottom || charBottom > r2Top ) )
			{
				collision = v;
				return false;
			}
			else
				collision = false;

		});
		
		return collision;
	},
	
	checkVoidBellow : function (posX, posY, lvl){
		return this.checkCollision(posX, posY - 1, lvl);
	}	
};

/**
*	
*/
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
	
	this.addTile = function(tile) {
		this.tiles.push(tile);
	}
	
	this.addSettings = function(setting) {
		this.settings.push(setting);
	}
	
	this.setRawData = function(data) {

		this.mapRaw = data;

		for(var i = 0; i < this.mapRaw.field.length ; i++) {
			
			var item = this.mapRaw.field[i];
			
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
			
			if( ! this.tiles[item.type]) {
			
				var img = new Image();
				img.src = 'assets/tile/' + item.type + '.png';
				img.onload = this.tileLoaded.bind(this);
				
				this.tiles[item.type] = new Tile(img);
				this.tiles.length += 1;
				this.tilesToLoad += 1;

			}
			
		}
	}
	
	this.tileLoaded = function(event) {
		
		this.tilesLoaded += 1;
		
		if(this.tilesLoaded == this.tilesToLoad)
			this.draw();
	}
	
	this.draw = function() {
		
		var diffY = CANVAS.height(),
			height = CANVAS.height(),
			width = CANVAS.width();
		
		for(var i = 0; i < this.mapRaw.field.length; i++) {
			
			var item = this.mapRaw.field[i],
				imgTile = this.tiles[item.type];

				imgTile.drawAt(item.x, item.y);
		}
		
		for(var i = 0; i < this.mapRaw.setting.length; i++) {
			
			var item = this.mapRaw.setting[i],
				imgTile = this.tiles[item.type];

				imgTile.drawAt(item.x, item.y);
		}

		this.characters[0].draw();

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