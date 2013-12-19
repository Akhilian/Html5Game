include('CONFIG');
include('maps/Position');
include('maps/Tile');
include('maps/Tileset');
include('maps/Mapper');
include('animation/Character');
include('Control');

/**
	Main : Init the game
*/
function CrazyGame() {
	
	// Attributs
	this.lvl = 1;
	this.map = null;
	
	this.character = null;
	
	// Methodes
	this.initMap = function() {
		var data = Mapper.loadMap(this.lvl);
		this.map = Mapper.createMap(data);
	}
	
	this.setCharacters = function() {
	
		var initPos = Mapper.getInitialPosition(this.lvl);
		
		this.character = new Character(this);
		this.character.setPosition( TILE_SIZE * initPos.x, TILE_SIZE * initPos.y);

		var chars = new Array();
		chars.push(this.character);

		this.map.setCharacters(chars);
	}
	
	this.start = function() {

		var controler = new ControlManager(this);
		controler.start();

	}
}


// Miscellaneous
// ------------------------

function include(file) {
	var url = 'js/' + file + '.js';	
	$('#javascript').append('<script src="' + url + '"></script>');
}

/**
	Main : Init the game
*/
define('CrazyGame', ['CONFIG', 'maps/Mapper', 'animation/Character'], function(CONFIG, Mapper, Character) {

	function CrazyGame(lvl) {
		this.lvl = lvl;
		this.map = null;
	}

	CrazyGame.prototype.start = function() {
		this.initMap();
		this.setCharacters();
	}

	CrazyGame.prototype.initMap = function() {
		var data = Mapper.loadMap(this.lvl);
		this.map = Mapper.createMap(data);
	}

	CrazyGame.prototype.setCharacters = function() {
	
		var initPos = Mapper.getInitialPosition(this.lvl);
		
		this.character = new Character(this);
		this.character.setPosition( CONFIG.TILE_SIZE * initPos.x, CONFIG.TILE_SIZE * initPos.y);

		var chars = new Array();
		chars.push(this.character);

		this.map.setCharacters(chars);
	}

	return CrazyGame;

});