'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityClassification = mongoose.model('EntityClassification');

/**
 * Globals
 */
var user, entityClassification;

/**
 * Unit tests
 */
describe('Entity classification Model Unit Tests:', function() {
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
			entityClassification = new EntityClassification({
				name: 'Entity classification Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return entityClassification.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			entityClassification.name = '';

			return entityClassification.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		EntityClassification.remove().exec();
		User.remove().exec();

		done();
	});
});