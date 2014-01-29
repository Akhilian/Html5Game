define('FpsMonitor', ['CONFIG', 'Stats'], function(CONFIG, Stats) {

	return {

		// Set FPS Monitor environment
		init : function() {

			if(CONFIG.DISPLAY_FPS_MONITOR) {

				this.fpsMonitor = new Stats();
				this.fpsMonitor.setMode(0);

				this.fpsMonitor.domElement.style.position = 'absolute';
				this.fpsMonitor.domElement.style.left = '0px';
				this.fpsMonitor.domElement.style.top = '0px';

				document.body.appendChild( this.fpsMonitor.domElement );

			}
		},

		begin : function() {

			if( CONFIG.DISPLAY_FPS_MONITOR )
			{
				if( this.fpsMonitor != undefined )
					this.fpsMonitor.begin();
				else
					throw "Please set up the monitor by calling FpsMonitor.init() first.";
			}
		},

		end : function() {

			if( CONFIG.DISPLAY_FPS_MONITOR )
			{
				if ( this.fpsMonitor != undefined )
					this.fpsMonitor.end();
				else
					throw "Please set up the monitor by calling FpsMonitor.init() first.";
			}
		}
	}

})