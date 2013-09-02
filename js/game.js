include('CONFIG');
include('maps/Mapper');
include('animation/Character');
include('Control');

/**
	Main : Init the game
	
	nbPlayers : Nombre de joueurs
*/
function CrazyGame(nbPlayers) {
	
	// Attributs
	this.nbPlayers = nbPlayers;
	this.lvl = 1;
	this.map = null;
	
	this.tileSize = 70;
	
	// Methodes
	this.initMap = function() {
		var data = Mapper.loadMap(this.lvl);
		this.map = Mapper.createMap(data);
	}
	
	this.setCharacters = function() {
	
		var boc = new Character(this);
		var initPos = Mapper.getInitialPosition(this.lvl);
		
		boc.setPosition( this.tileSize * initPos.x, this.tileSize * initPos.y);
//		boc.drawChar();
		
		var controler = new ControlManager(boc, this.map);
		controler.start();

	}
	
	this.start = function() {}
}


// Miscellaneous
// ------------------------

function include(file) {
	var url = 'js/' + file + '.js';	
	$('#javascript').append('<script src="' + url + '"></script>');
}