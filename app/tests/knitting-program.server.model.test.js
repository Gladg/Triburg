'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	KnittingProgram = mongoose.model('KnittingProgram');

/**
 * Globals
 */
var user, knittingProgram;

/**
 * Unit tests
 */
describe('Knitting program Model Unit Tests:', function() {
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
			knittingProgram = new KnittingProgram({
				name: 'Knitting program Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return knittingProgram.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			knittingProgram.name = '';

			return knittingProgram.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		KnittingProgram.remove().exec();
		User.remove().exec();

		done();
	});
});