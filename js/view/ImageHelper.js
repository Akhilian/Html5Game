define(['jquery', 'CONFIG', 'maps/Position'], function($, CONFIG, Position) {

	var defaultSliceOptions = {
		margin: 0,
		spacing: 0,
		tileoffset: {
			x: 0,
			y: 0
		}
	}


	function ImageHelper() {

		this.image = undefined;
		this.imageLoaded = false;

		this.deferred = $.Deferred();
	}

	ImageHelper.prototype.load = function(imageUrl) {

		try{

			this.image = new Image();
			this.image.src = imageUrl;
			this.image.onload = this.onLoadCallback.bind(this);
			this.image.onerror = this.onErrorCallback.bind(this);
		}
		catch(e) {
			console.warn('ATTRAPER LES TOUS');
		}


		return this.deferred;

	};

	ImageHelper.prototype.getImage = function() {
		return (this.isLoaded()) ? this.image : false;
	}

	ImageHelper.prototype.onLoadCallback = function() {
		this.imageLoaded = true;
		this.deferred.resolve(this.image);

		return true;
	};

	ImageHelper.prototype.onErrorCallback = function(errorMessage, url, lineNumber) {
		this.deferred.reject(errorMessage);

		return true;
	};

	ImageHelper.prototype.isLoaded = function() {
		return this.deferred.state() == 'resolved';
	}

	/**
	 * Slice the current Image into several TileImages using a canvas manipulation
	 * This solution to split a single image into a set is heavily inspired by this article:
	 * http://thiscouldbebetter.wordpress.com/2012/02/25/slicing-an-image-into-tiles-in-javascript/
	 * 
	 * @param  {object} options Options for the tileset organisation
	 * @return {Image[]}         
	 */
	ImageHelper.prototype.slice = function(options) {

		var imageList = [], rowCount = 0, colCount = 0;

		if(this.isLoaded()) {

			colCount = Math.round(this.getImage().width / CONFIG.TILE_SIZE);
			rowCount = Math.round(this.getImage().height / CONFIG.TILE_SIZE);

			var tilePoint = new Position(0,0), sourcePoint = new Position(0,0);


			for(var y = 0; y < colCount; y++) {

				tilePoint.setY(y);

				for(var x=0; x< rowCount; x++) {

					tilePoint.setX(x);


					graphics.drawImage
					(						
						// Image to be sliced
						this.image,

						// Tile position on the image
						sourcePoint.getX() * 70, sourcePoint.getY() * 70,

						// Destination position
						// So, the (0,0) point of our "fake" canvas
						0, 0,

						// Destination size
						// So the exact size of a tile (70,70)
						CONFIG.TILE_SIZE, CONFIG.TILE_SIZE

					);

				}

			}

			console.log(imageList);


		}
		else
			throw "The current image is not loaded yet.";

	}

	return ImageHelper;


});