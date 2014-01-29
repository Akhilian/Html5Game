//define(['requirejs', 'physicsjs', 'physicsjs/bodies/circle'], function(require, Physics){

	/**
	 *	Slope geometry
	 *	@module geometry/slope
	 */
	Physics.geometry('slope', function( parent ) {

		var defaults = {
			// Default configuration
		};

		return {

			/**
			 * Initialization
			 * @param  {Object} options Configuration options
			 * @return {void}
			 */
			init: function(options) {

				parent.init.call(this, options);
				options = Physics.util.extend({}, defaults, options);

				// Allow us to know if the slope is rising or descending
				this.direction = options.direction;

				// Center
				this.h = options.h || 0;
				this.w = options.w || 0;

				console.log('Initialization of the slope.');


			}

		}

	});

//});