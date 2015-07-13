'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	KnittingProgramFabricDetail = mongoose.model('KnittingProgramFabricDetail');

/**
 * Globals
 */
var user, knittingProgramFabricDetail;

/**
 * Unit tests
 */
describe('Knitting program fabric detail Model Unit Tests:', function() {
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
			knittingProgramFabricDetail = new KnittingProgramFabricDetail({
				name: 'Knitting program fabric detail Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return knittingProgramFabricDetail.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			knittingProgramFabricDetail.name = '';

			return knittingProgramFabricDetail.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		KnittingProgramFabricDetail.remove().exec();
		User.remove().exec();

		done();
	});
});