var TileTools = {

	create : function(type, x, y) {
		return new Tile(type, x, y);
	}

}

function Tile(img, x, y) {
	
	// Attributs
	this.type = img;
	this.posX = x;
	this.posY = y;
	
	// Methodes
	this.setPosition = function(x, y) {
		this.posX = x;
		this.posY = y;
	}
}