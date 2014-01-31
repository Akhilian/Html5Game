function Life() {
	this.currentHealthPoints = this.maxHealthPoints;
}

Life.prototype.isDead = function() {
	return  (this.currentHealthPoints < 0);
};

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