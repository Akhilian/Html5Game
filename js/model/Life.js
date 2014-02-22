/**
 * Life class to manage the level of health
 *
 * @author Adrien SAUNIER (Alwin)
 * @param  {CONFIG} CONFIG Simple Key/Value object with basics informations
 */
define(['CONFIG'], function(CONFIG) {

	function Life() {
		this.currentHealthPoints = CONFIG.MAX_HEALTH_POINTS;
	}

	Life.prototype.getHealth = function() {
		return this.currentHealthPoints;
	};

	Life.prototype.loseHealth = function(HPAmount) {

		if(HPAmount > 0) {
			this.currentHealthPoints -= HPAmount;

			if(this.currentHealthPoints <= 0) {
				this.currentHealthPoints = 0;
			}
		}
		else
			throw new Error("MustNotBeNegative");
	};

	Life.prototype.isDead = function() {
		return  (this.currentHealthPoints < 0);
	};
/*
	Life.prototype.recoverHealth = function(HPAmount) {

		var success = false;

		if( HPAmount > 0 ) {

			if( this.currentHealthPoints >= MAX_HEALTH_POINTS ) {
				this.currentHealthPoints = MAX_HEALTH_POINTS;
			}
			else if( this.currentHealthPoints + HPAmount >= MAX_HEALTH_POINTS ) {
				this.currentHealthPoints = MAX_HEALTH_POINTS;
				success = true;
			}
			else {
				this.currentHealthPoints += HPAmount;
				success = true;
			}
		}

		return success;
	};

	return Life;
	*/

	return Life;

});