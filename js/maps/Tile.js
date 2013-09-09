function Tile(img, canvas) {
	
	// Attributs
	this.imgSrc = img;

	// Methodes
	this.drawAt = function(x, y, convert) {

		var diffY = CANVAS.height(),
			height = CANVAS.height(),
			width = CANVAS.width();

		if(convert == undefined){
			
			CONTEXT.drawImage(
				this.imgSrc,
				70 * x,
				diffY - 70 * ( y + 1 )
			);
		}
		else
		{
			CONTEXT.drawImage(
				this.imgSrc,
				x,
				diffY - y - (1 * 94)
			);
		}

		
	}
}