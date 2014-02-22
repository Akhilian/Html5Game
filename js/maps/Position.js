/**
 * Simple 2D coordinates class
 * @return {Position} Position Class
 */
define([], function() {

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

	Position.prototype.setX = function(x) {
		this.x = x;
	}

	Position.prototype.setY = function(y) {
		this.y = y;
	}

	Position.prototype.getX = function() {
		return this.x;
	}

	Position.prototype.getY = function() {
		return this.y;
	}

	return Position;

});