'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MachineryEquipmentList = mongoose.model('MachineryEquipmentList');

/**
 * Globals
 */
var user, machineryEquipmentList;

/**
 * Unit tests
 */
describe('Machinery equipment list Model Unit Tests:', function() {
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
			machineryEquipmentList = new MachineryEquipmentList({
				name: 'Machinery equipment list Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return machineryEquipmentList.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			machineryEquipmentList.name = '';

			return machineryEquipmentList.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		MachineryEquipmentList.remove().exec();
		User.remove().exec();

		done();
	});
});