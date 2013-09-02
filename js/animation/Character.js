include('maps/Mapper');

function Character(game) {

	// Attributs
	this.name = 'mitch';
	this.walkingStep = 1;
	this.maxWalkingStep = 11;
	
	this.game = game;
	
	this.posX;
	this.posY;
	
	this.speedX = 0;
	this.speedY = 'none';
	
	this.MAX_SPEED = 30;

	// Methodes
	this.nextWalkingStep = function() {
	
		$('#' + this.name).removeClass('walk' + this.walkingStep);
	
		if(this.walkingStep == this.maxWalkingStep)
			this.walkingStep = 1;		
		else
			this.walkingStep++;

		$('#' + this.name).addClass('walk' + this.walkingStep);
			
	}
	
	this.setPosition = function(x, y) {
		this.posX = x;
		this.posY = y;
		
		$('#' + this.name).css("left", 	this.posX );
		$('#' + this.name).css('bottom',	this.posY );
	}
	
	this.moveByY = function(y) {
		this.posY += y;
		$('#' + this.name).css('bottom',	this.posY	 );
	}
	
	this.moveByX = function(x) {
		this.posX += x;
		$('#' + this.name).css('left',	this.posX	 );
	}
	
	this.drawChar = function() {
	
		$('body').append('<div id="' + this.name + '"' +
			'class="char ' + this.name + ' walk1" style="left:' + this.posX +  'px; bottom:' + this.posY + 'px;">');
	}
	
	this.jump = function() {
		
		if(this.speedY == 'none')
			this.speedY = 50;
	}
	
	this.moveRight = function() {
		this.speedX = 10;
	}

	this.moveLeft = function() {
		this.speedX = -5;
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

//						console.log(this.posX + this.speedX);
//						console.log(this.posY);

						// If there is no speedY yet, we start the fall
						if( this.speedY == 'none' )
							this.speedY = -1;

					
					}
				
					this.moveByX(this.speedX);
					this.nextWalkingStep();
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