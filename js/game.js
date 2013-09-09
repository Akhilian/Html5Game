include('CONFIG');
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
	
	this.tileSize = 70;
	
	this.character = null;
	
	// Methodes
	this.initMap = function() {
		var data = Mapper.loadMap(this.lvl);
		this.map = Mapper.createMap(data);
	}
	
	this.setCharacters = function() {
	
		var initPos = Mapper.getInitialPosition(this.lvl);
		
		this.character = new Character(this);
		this.character.setPosition( this.tileSize * initPos.x, this.tileSize * initPos.y);

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