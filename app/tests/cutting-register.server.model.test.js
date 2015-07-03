'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CuttingRegister = mongoose.model('CuttingRegister');

/**
 * Globals
 */
var user, cuttingRegister;

/**
 * Unit tests
 */
describe('Cutting register Model Unit Tests:', function() {
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
			cuttingRegister = new CuttingRegister({
				name: 'Cutting register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return cuttingRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			cuttingRegister.name = '';

			return cuttingRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		CuttingRegister.remove().exec();
		User.remove().exec();

		done();
	});
});