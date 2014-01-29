define(['CONFIG'], function(CONFIG) {

	function Tile(img) {
	
		// Attributs
		this.imgSrc = img;
		this.tileIsLoaded = false;

		// Methodes
		this.drawAt = function(x, y, convert) {

			var height = CONFIG.CANVAS.height(),
				width = CONFIG.CANVAS.width();

			if(convert == undefined){
				
				CONFIG.CONTEXT.drawImage(
					this.imgSrc,
					CONFIG.TILE_SIZE * x,
					height - CONFIG.TILE_SIZE * ( y )
				);

			}
			else
			{
				CONFIG.CONTEXT.drawImage(
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

	return Tile;

});