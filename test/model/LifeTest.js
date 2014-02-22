define(['model/Life'], function(Life) {
	
	describe('Creation of a Life Object', function() {

		var life;

		beforeEach(function() {
			life = new Life();
		});

		it('is correctly created', function() {
			expect(life).not.toBeUndefined();
		});

		it('is created full life', function() {
			expect(life.getHealth()).toEqual(6);
		});
	});

	describe('A life object is loosing', function() {

		var life;

		beforeEach(function() {
			life = new Life();
		});

		it('a medium amount', function() {
			life.loseHealth(2);
			expect(life.getHealth()).toEqual(4);
		});

		it('enought to be exactly zero', function() {
			var res = life.loseHealth(6);
			expect(life.getHealth()).toEqual(0);

			life = new Life();
			res = life.loseHealth(7);
			expect(life.getHealth()).toEqual(0);
		});

		it('health but cant lose a negative amount', function() {
			expect(function() { life.loseHealth(-4); }).toThrow(new Error('MustNotBeNegative'));
		});

	});

});