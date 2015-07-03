'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityClassificationDetail = mongoose.model('EntityClassificationDetail');

/**
 * Globals
 */
var user, entityClassificationDetail;

/**
 * Unit tests
 */
describe('Entity classification detail Model Unit Tests:', function() {
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
			entityClassificationDetail = new EntityClassificationDetail({
				name: 'Entity classification detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return entityClassificationDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			entityClassificationDetail.name = '';

			return entityClassificationDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		EntityClassificationDetail.remove().exec();
		User.remove().exec();

		done();
	});
});