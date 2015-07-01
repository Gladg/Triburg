'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FinishingActivityRegister = mongoose.model('FinishingActivityRegister');

/**
 * Globals
 */
var user, finishingActivityRegister;

/**
 * Unit tests
 */
describe('Finishing activity register Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			finishingActivityRegister = new FinishingActivityRegister({
				name: 'Finishing activity register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return finishingActivityRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			finishingActivityRegister.name = '';

			return finishingActivityRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FinishingActivityRegister.remove().exec();
		User.remove().exec();

		done();
	});
});