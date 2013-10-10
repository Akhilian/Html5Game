function Position(x, y) {
	this.x = x;
	this.y = y;
}

Position.prototype.getTileConvertedPosition = function() {
	
	return {
		x : Math.floor(this.x / TILE_SIZE),
		y : Math.floor(this.y / TILE_SIZE)
	};

};