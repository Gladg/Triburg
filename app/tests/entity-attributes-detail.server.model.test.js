'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityAttributesDetail = mongoose.model('EntityAttributesDetail');

/**
 * Globals
 */
var user, entityAttributesDetail;

/**
 * Unit tests
 */
describe('Entity attributes detail Model Unit Tests:', function() {
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
			entityAttributesDetail = new EntityAttributesDetail({
				name: 'Entity attributes detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return entityAttributesDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			entityAttributesDetail.name = '';

			return entityAttributesDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		EntityAttributesDetail.remove().exec();
		User.remove().exec();

		done();
	});
});