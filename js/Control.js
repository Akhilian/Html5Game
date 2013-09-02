include('animation/Renderer');

function ControlManager(character, m) {

	this.character = character;
	this.map = m;
	
	this.start = function() {
	
		Renderer.start(this.character, this.map);
	
		$('body').keydown(function(event) {
			
			// Move to the right
			if(event.which == 39) {
				character.moveRight();
			}
			else if(event.which == 37) {
				character.moveLeft();
			}
			else if(event.which == 32) {
				character.jump();
			}
				
			
		});
		
		$('body').keyup(function(event) {
			
			// Move to the right
			if(event.which == 39) {
				character.stop();
			}
			else if(event.which == 37) {
				character.stop();
			}
			else if(event.which == 27)
				this.map.drawMenu();
			
		});
	
	}

}