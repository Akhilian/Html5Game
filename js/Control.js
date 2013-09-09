include('animation/Renderer');

function ControlManager(gameInstance) {

	this.game = gameInstance;
	
	this.start = function() {
	
		Renderer.start(this.game.character, this.game.map);
	
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
//				game.character.stop();
			}
			else if(event.which == 37) {
				game.character.stop();
			}
			else if(event.which == 27)
				map.drawMenu();
			
		});
	
	}

}