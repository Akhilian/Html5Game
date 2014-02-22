define(['CONFIG', 'view/ImageHelper'], function(CONFIG, ImageHelper) {

	function Tileset(name, startID, count) {
		this.name = name;
		this.startID = startID;
		this.tileCount = count;
	}

	/**
	 * @return {string} Tileset name
	 */
	Tileset.prototype.getName = function() {
		return this.name;
	};

	/**
	 * @param {string} name
	 */
	Tileset.prototype.setName = function(name) {
		this.name = name;
	};

	/**
	 * Return the begining ID
	 * @return {[type]} [description]
	 */
	Tileset.prototype.getStartId = function() {
		return this.startID;
	};

	/**
	 * @param {int} startID Start ID for tiles in the file
	 */
	Tileset.prototype.setStartId = function(startID) {
		this.startID = startID;
	};

	/**
	 * Create a list of Tiles
	 * @return {[type]} [description]
	 */
	Tileset.prototype.loadTiles = function() {

		if(this.name) {

			var helper, process;

			for(var i = this.startID; i < this.startID + this.tileCount; i++) {
				
				helper = new ImageHelper();
				process = helper.load(CONFIG.ASSETS_DIR + this.name + '/' + i + '.png');

				process.done(function(message) {

					//console.log(message);
					//helper.slice();
				});

				process.fail(function(message) {
					console.warn(i + '.png doesnt exist');
					//console.error(message);
				});

			}

			/*var helper = new ImageHelper();
			var process = helper.load(CONFIG.ASSETS_DIR);

			process.done(function(message) {

				console.log(this);
				//helper.slice();

			});

			process.fail(function(message) {
				console.error(message);
			});*/

		}
		else
			throw "TilesetName must not be empty";
	};

	Tileset.prototype.load = function(tileID) {
		if(this.file) {
			if(tileID < this.startID) {

			}
			else
				throw "This is tileID is too low to be in this tileset.";
		}
		else
			throw "FileUrl must not be empty.";
	}

	/**
	 * Merge 
	 * @param  {[type]} tileset The Tileset to be merged with the current item
	 * @return {Tileset}         The merged tileset
	 */
	Tileset.prototype.merge = function(tileset) {

	};

	return Tileset;

});