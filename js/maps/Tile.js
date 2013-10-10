function Tile(img) {
	
	// Attributs
	this.imgSrc = img;
	this.tileIsLoaded = false;

	// Methodes
	this.drawAt = function(x, y, convert) {

		var height = CANVAS.height(),
			width = CANVAS.width();

		if(convert == undefined){
			
			CONTEXT.drawImage(
				this.imgSrc,
				TILE_SIZE * x,
				height - TILE_SIZE * ( y )
			);

		}
		else
		{
			CONTEXT.drawImage(
				this.imgSrc,
				x,
				height - y - ( this.imgSrc.height )
			);
		}

		
	}
}

Tile.prototype.tileLoaded = function() {
	this.tileIsLoaded = true;
};