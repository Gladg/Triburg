'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MachineryEquipmentList = mongoose.model('MachineryEquipmentList'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, machineryEquipmentList;

/**
 * Machinery equipment list routes tests
 */
describe('Machinery equipment list CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Machinery equipment list
		user.save(function() {
			machineryEquipmentList = {
				name: 'Machinery equipment list Name'
			};

			done();
		});
	});

	it('should be able to save Machinery equipment list instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinery equipment list
				agent.post('/machinery-equipment-lists')
					.send(machineryEquipmentList)
					.expect(200)
					.end(function(machineryEquipmentListSaveErr, machineryEquipmentListSaveRes) {
						// Handle Machinery equipment list save error
						if (machineryEquipmentListSaveErr) done(machineryEquipmentListSaveErr);

						// Get a list of Machinery equipment lists
						agent.get('/machinery-equipment-lists')
							.end(function(machineryEquipmentListsGetErr, machineryEquipmentListsGetRes) {
								// Handle Machinery equipment list save error
								if (machineryEquipmentListsGetErr) done(machineryEquipmentListsGetErr);

								// Get Machinery equipment lists list
								var machineryEquipmentLists = machineryEquipmentListsGetRes.body;

								// Set assertions
								(machineryEquipmentLists[0].user._id).should.equal(userId);
								(machineryEquipmentLists[0].name).should.match('Machinery equipment list Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Machinery equipment list instance if not logged in', function(done) {
		agent.post('/machinery-equipment-lists')
			.send(machineryEquipmentList)
			.expect(401)
			.end(function(machineryEquipmentListSaveErr, machineryEquipmentListSaveRes) {
				// Call the assertion callback
				done(machineryEquipmentListSaveErr);
			});
	});

	it('should not be able to save Machinery equipment list instance if no name is provided', function(done) {
		// Invalidate name field
		machineryEquipmentList.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinery equipment list
				agent.post('/machinery-equipment-lists')
					.send(machineryEquipmentList)
					.expect(400)
					.end(function(machineryEquipmentListSaveErr, machineryEquipmentListSaveRes) {
						// Set message assertion
						(machineryEquipmentListSaveRes.body.message).should.match('Please fill Machinery equipment list name');
						
						// Handle Machinery equipment list save error
						done(machineryEquipmentListSaveErr);
					});
			});
	});

	it('should be able to update Machinery equipment list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinery equipment list
				agent.post('/machinery-equipment-lists')
					.send(machineryEquipmentList)
					.expect(200)
					.end(function(machineryEquipmentListSaveErr, machineryEquipmentListSaveRes) {
						// Handle Machinery equipment list save error
						if (machineryEquipmentListSaveErr) done(machineryEquipmentListSaveErr);

						// Update Machinery equipment list name
						machineryEquipmentList.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Machinery equipment list
						agent.put('/machinery-equipment-lists/' + machineryEquipmentListSaveRes.body._id)
							.send(machineryEquipmentList)
							.expect(200)
							.end(function(machineryEquipmentListUpdateErr, machineryEquipmentListUpdateRes) {
								// Handle Machinery equipment list update error
								if (machineryEquipmentListUpdateErr) done(machineryEquipmentListUpdateErr);

								// Set assertions
								(machineryEquipmentListUpdateRes.body._id).should.equal(machineryEquipmentListSaveRes.body._id);
								(machineryEquipmentListUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Machinery equipment lists if not signed in', function(done) {
		// Create new Machinery equipment list model instance
		var machineryEquipmentListObj = new MachineryEquipmentList(machineryEquipmentList);

		// Save the Machinery equipment list
		machineryEquipmentListObj.save(function() {
			// Request Machinery equipment lists
			request(app).get('/machinery-equipment-lists')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Machinery equipment list if not signed in', function(done) {
		// Create new Machinery equipment list model instance
		var machineryEquipmentListObj = new MachineryEquipmentList(machineryEquipmentList);

		// Save the Machinery equipment list
		machineryEquipmentListObj.save(function() {
			request(app).get('/machinery-equipment-lists/' + machineryEquipmentListObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', machineryEquipmentList.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Machinery equipment list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinery equipment list
				agent.post('/machinery-equipment-lists')
					.send(machineryEquipmentList)
					.expect(200)
					.end(function(machineryEquipmentListSaveErr, machineryEquipmentListSaveRes) {
						// Handle Machinery equipment list save error
						if (machineryEquipmentListSaveErr) done(machineryEquipmentListSaveErr);

						// Delete existing Machinery equipment list
						agent.delete('/machinery-equipment-lists/' + machineryEquipmentListSaveRes.body._id)
							.send(machineryEquipmentList)
							.expect(200)
							.end(function(machineryEquipmentListDeleteErr, machineryEquipmentListDeleteRes) {
								// Handle Machinery equipment list error error
								if (machineryEquipmentListDeleteErr) done(machineryEquipmentListDeleteErr);

								// Set assertions
								(machineryEquipmentListDeleteRes.body._id).should.equal(machineryEquipmentListSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Machinery equipment list instance if not signed in', function(done) {
		// Set Machinery equipment list user 
		machineryEquipmentList.user = user;

		// Create new Machinery equipment list model instance
		var machineryEquipmentListObj = new MachineryEquipmentList(machineryEquipmentList);

		// Save the Machinery equipment list
		machineryEquipmentListObj.save(function() {
			// Try deleting Machinery equipment list
			request(app).delete('/machinery-equipment-lists/' + machineryEquipmentListObj._id)
			.expect(401)
			.end(function(machineryEquipmentListDeleteErr, machineryEquipmentListDeleteRes) {
				// Set message assertion
				(machineryEquipmentListDeleteRes.body.message).should.match('User is not logged in');

				// Handle Machinery equipment list error error
				done(machineryEquipmentListDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		MachineryEquipmentList.remove().exec();
		done();
	});
});