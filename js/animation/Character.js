include('maps/Mapper');

function Character(game) {

	// Attributs
	this.name = 'mitch';
	this.walkingStep = 1;
	
	this.game = game;
	
	this.posX;
	this.posY;
	
	this.speedX = 0;
	this.speedY = 'none';

	this.characterTile = initTile(this);

	// Constructor
	function initTile(character) {

		var img = new Image();
			img.src = 'assets/character/' + character.name + '/walk01.png';
//			img.onload = tileLoaded.bind(character);

			return new Tile(img);
	}

	
	this.setPosition = function(x, y) {
		this.posX = x;
		this.posY = y;
	}
	
	this.moveByY = function(y) {
		this.posY += y;
	}
	
	this.moveByX = function(x) {
		this.posX += x;
	}
	
	this.drawChar = function() {
	}
	
	this.jump = function() {
		
		if(this.speedY == 'none')
			this.speedY = 50;
	}
	
	this.moveRight = function() {
		this.speedX = 20;
	}

	this.moveLeft = function() {
		this.speedX = -10;
	}
	
	this.stop = function() {
		this.speedX = 0;
	}
	
	this.move = function() {
	
		// Vertical movement
		if(this.speedY != 'none') {
			
			if(this.speedY > 0) {
				this.speedY = Math.floor(this.speedY * 0.75);
				this.moveByY(this.speedY);
			}
			else if(this.speedY == 0) {
				this.speedY = -1;
			}
			else {
			
				if( Mapper.checkCollision(this.posX, this.posY + Math.ceil( 1.15 * this.speedY ), this.game.lvl) == false)
				{					
					this.speedY = Math.floor( 1.15 * this.speedY );
					this.moveByY(this.speedY);
				}
				else
				{
					var tile = Mapper.checkCollision(this.posX, this.posY + Math.ceil( 1.15 * this.speedY ), this.game.lvl);
					this.moveByY(((tile.y + 1) * 70) - this.posY);
					
					this.speedY = 'none';
				}
			}
			
		}



		if( this.speedX != 0)
		{
			
			if ( this.posX + this.speedX > 0 )
			{
				if ( Mapper.checkCollision( ( this.posX + this.speedX ), this.posY, this.game.lvl) == false )
				{ 

					// We check if there is some falling risk
					if( Mapper.checkVoidBellow( ( this.posX + this.speedX ), this.posY, this.game.lvl ) == false ){

						// If there is no speedY yet, we start the fall
						if( this.speedY == 'none' )
							this.speedY = -1;

						var slowing = Math.ceil(8 / 3);
						console.log(slowing);

					
					}
				
					this.moveByX(this.speedX);
				}
			}
			else
			{
				this.stop();
			}
			
//			}
//			else if( this.speedX < 0) {
//				this.moveByX(this.speedX);
//			}
		}
	}

}

Character.prototype.draw = function() {
	this.characterTile.drawAt(this.posX, this.posY, true);
}