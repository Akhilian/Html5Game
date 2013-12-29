/**
*	Singleton pattern to describe the @Viewport
*	@version 0.1
*/
define(['CONFIG'], function(CONFIG) {

	var viewportInstance;

	function init() {

		var viewPort = {
			x : 0,
			y : 0,  
			width : CONFIG.CANVAS.width(),
			height : CONFIG.CANVAS.height()
		};

		function privateSetX(x) {
			this.viewport.x = x;
		}

		return {
			viewport : viewPort,

			toString : function() {
				return this.viewportInstance.x + ' - ' + this.viewportInstance.y;
			},

			setX : function(x) {
				privateSetX(x);
			}
		}

	};

	return {
		getInstance : function() {
			if( ! this.viewportInstance ) {
				this.viewportInstance = init();
			}

			return this.viewportInstance;
		}
	};

});