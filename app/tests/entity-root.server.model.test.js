'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityRoot = mongoose.model('EntityRoot');

/**
 * Globals
 */
var user, entityRoot;

/**
 * Unit tests
 */
describe('Entity root Model Unit Tests:', function() {
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
			entityRoot = new EntityRoot({
				name: 'Entity root Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return entityRoot.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			entityRoot.name = '';

			return entityRoot.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		EntityRoot.remove().exec();
		User.remove().exec();

		done();
	});
});