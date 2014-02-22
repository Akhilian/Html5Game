define(['./Map'], function(Map){

	return {

		loadMap : function(lvl) {
			
			var url = 'js/maps/json/lvl' + lvl + '.json';
			var data;
		
			$.ajax({
				dataType: "json",
				url: url,
				async : false,
				success: function(d) {
					data = d;
				}
			});			
			return data;
		},

		createMap : function(data) {
		
			$('#map').attr('width', $(window).width());
			$('#map').attr('height', $(window).height());
			
			var map = new Map(),
				monitor = map.getLoadingMonitor();

			monitor.progress(function(message) {
				console.log('Loading message : ' + message + "%");
			});

			map.setRawData(data);
			
			return map;
		},

		getInitialPosition : function(lvl) {
	
			var url = 'js/maps/json/map' + lvl + '.json';
			var position;
		
			$.ajax({
				dataType: "json",
				url: url,
				async : false,
				success: function(d) {
					position = d.initialPosition;
				}
			});
			
			return position;
		}
	};
});