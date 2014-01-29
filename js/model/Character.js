define(['maps/Mapper', 'view/Tile', 'maps/Position', 'maps/Viewport'], function(Mapper, Tile, Position, Viewport) {

	function Character(game) {

		// Attributs
		this.name = 'mitch';
		this.walkingStep = 1;
		
		this.game = game;
		
		this.position;
		
		this.speedX = 0;
		this.speedY = 'none';

		this.characterTile = initTile(this);

		// Constructor
		function initTile(character) {

			var tiles = [];

			for (var i = 1; i <= 11; i++) {

				var imgName = "";

				if( i < 10)
					imgName = "walk0" + i;
				else
					imgName = "walk" + i;

				var img = new Image();
				img.src = 'assets/character/' + character.name + '/' + imgName + '.png';

				tiles[i] = new Tile(img);

				img.onload = tiles[i].tileLoaded();

			}
			
			return tiles;
		}

	}

	Character.prototype.setPosition = function(x, y) {
		this.position = new Position(x, y);
	}
	
	Character.prototype.moveByY = function(y) {
		this.position.y += y;
	}
	
	Character.prototype.moveByX = function(x) {
		this.position.x += x;
	}
		
	Character.prototype.jump = function() {
		
		if(this.speedY == 'none')
			this.speedY = JUMP;
	}
	
	Character.prototype.moveRight = function() {

 		if( this.speedX >= 0 )
			this.speedX = SPEED_X;
		else
			console.log('Impossible d\'avancer');

	}

	Character.prototype.moveLeft = function() {

		if( Math.abs(this.speedX) < MAX_SPEED && this.speedX <= 0 )
			this.speedX = - 1 * SPEED_X;
			
	}

	Character.prototype.slow = function() {
		this.slowing = true;
	}
	
	Character.prototype.stop = function() {
		this.speedX = 0;
		this.stoppingStep();
	}
	
	Character.prototype.move = function() {

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

				if( this.game.map.checkCollision(this.position.x, this.position.y + Math.ceil( GRAVITY_DOWN * this.speedY )) === false)
				{
					this.speedY = Math.floor( GRAVITY_DOWN * this.speedY );
					this.moveByY(this.speedY);
				}
				else
				{	
					
					console.log('Stop here');

//					var tile = this.game.map.checkCollision(this.position.x, this.position.y + Math.ceil( 1.15 * this.speedY ));
//					this.moveByY( ( ( tile.y + 1 ) * TILE_SIZE) - this.position.y);
					
					this.speedY = 'none';
				}
			}
		}


		if( this.speedX != 0)
		{
			this.nextWalkingStep();

			if ( this.game.map.checkCollision( ( this.position.x + this.speedX), this.position.y, this.game.lvl ) == false )
			{ 

				this.moveByX(this.speedX);
			}

			if( this.speedY == 0 || this.speedY == 'none' )
				if( this.game.map.checkVoidBelow( ( this.position.x + this.speedX ), this.position.y, this.game.lvl ) == true )
					this.speedY =-1;

		}
		else
			this.slowing = false;

	}


	Character.prototype.draw = function() {	

		var vp = Viewport.getInstance();
		this.characterTile[this.walkingStep].drawAt(this.position.x, this.position.y, true);
	}

	Character.prototype.stoppingStep = function() {
		this.walkingStep = 1;
	}

	Character.prototype.jumpingStep = function() {
	}

	Character.prototype.nextWalkingStep = function(){
		if( this.walkingStep < 11 )
			this.walkingStep++;
		else
			this.walkingStep = 1;
	}

	return Character;

});