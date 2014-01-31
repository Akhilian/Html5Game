define('ControlManager', ["view/Renderer"], function(Renderer) {


	function ControlManager(gameInstance) {

		this.game = gameInstance;
		this.renderer = undefined;
	}

	ControlManager.prototype.start = function() {

			this.renderer = new Renderer(this.game.character, this.game.map);
			this.renderer.start();

			var game = this.game;
		
			$('body').bind('keydown', game, function(event){
			
				// Move to the right
				if(event.which == 39) {
					game.character.moveRight();
				}
				else if(event.which == 37) {
					game.character.moveLeft();
				}
				else if(event.which == 32) {
					game.character.jump();
				}
			
			});
		
			$('body').bind('keyup', game, function(event){
				
				// Move to the right
				if(event.which == 39) {
					game.character.stop();
				}
				else if(event.which == 37) {
					game.character.stop();
				}
				else if(event.which == 27)
					map.drawMenu();
				
			});
		
		};

	return ControlManager;

});