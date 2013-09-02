include('maps/Tile');
include('maps/Tileset');

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

			var r2Left = (v.x * 70), r2Right = (v.x * 70) + 69;
			var r2Bottom = (v.y * 70), r2Top = (v.y * 70) + 69;

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

function Map() {

	this.mapRaw;

	this.settings = new Array();
	
	this.tilesToLoad = 0;
	this.tilesLoaded = 0;
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
				
				this.tiles[item.type] = img;
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
	
		var canvas = $("#map");
		var context = canvas[0].getContext('2d');
		
		var diffY = canvas.height(),
			height = canvas.height(),
			width = canvas.width();
		
		for(var i = 0; i < this.mapRaw.field.length; i++) {
			
			var item = this.mapRaw.field[i],
				img = this.tiles[item.type];

				context.drawImage(img, 70*item.x, diffY - 70* (item.y + 1));
		
		}	
		
		/*
		$.each( this.mapRaw.setting , function(key, tile) {
		
			var img=document.getElementById(tile.type);
			context.drawImage(img , ( 70 * tile.x ) , $('#map').height() - ( 70 * (tile.y + 1) ) );
			
		});*/
		
	}
	
	this.drawMenu = function() {
		console.log('On affiche le menu');
	}
}