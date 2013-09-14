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
	this.slowing = false;

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
			this.speedY = 100;
	}
	
	this.moveRight = function() {

		if(this.speedX < MAX_SPEED)
			this.speedX += SPEED_X;
	}

	this.moveLeft = function() {

		if( Math.abs(this.speedX) < MAX_SPEED)
			this.speedX += - 1 * SPEED_X;
	}

	this.slow = function() {
		this.slowing = true;
	}
	
	this.stop = function() {
		this.speedX = 0;
	}
	
	this.move = function() {

	
		// Vertical movement
		if(this.speedY != 'none') {
			
			if(this.speedY > 0) {
				this.speedY = Math.floor(this.speedY * GRAVITY_UP);
				this.moveByY(this.speedY);
			}
			else if(this.speedY == 0) {
				this.speedY = -1;
			}
			else {
			
				if( Mapper.checkCollision(this.posX, this.posY + Math.ceil( GRAVITY_DOWN * this.speedY ), this.game.lvl) == false)
				{					
					this.speedY = Math.floor( GRAVITY_DOWN * this.speedY );
					this.moveByY(this.speedY);
				}
				else
				{
					var tile = Mapper.checkCollision(this.posX, this.posY + Math.ceil( 1.15 * this.speedY ), this.game.lvl);
					this.moveByY( ( ( tile.y + 1 ) * TILE_SIZE) - this.posY);
					
					this.speedY = 'none';
				}
			}
			
		}

		if( this.speedX != 0 ) {

			this.moveByX( this.speedX );

		}


/*
		if( this.speedX != 0)
		{

			if( this.slowing == true ) {
				this.speedX = Math.floor(this.speedX * 0.75);
			}

			this.moveByX(this.speedX);


			if ( this.posX + this.speedX > 0 )
			{
				console.log(this.posX + this.speedX);

				if ( Mapper.checkCollision( ( this.posX + this.speedX ), this.posX, this.game.lvl) == false )
				{ 

					//this.speedX = this.speedX * 0.75;
//					this.moveByX(this.speedX);
				}
			}
			else
			{
				this.stop();
			}

		}
		else
			this.slowing = false;
*/
	}

}

Character.prototype.draw = function() {
	this.characterTile.drawAt(this.posX, this.posY, true);
}