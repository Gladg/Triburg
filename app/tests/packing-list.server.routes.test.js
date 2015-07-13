'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PackingList = mongoose.model('PackingList'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, packingList;

/**
 * Packing list routes tests
 */
describe('Packing list CRUD tests', function() {
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

		// Save a user to the test db and create new Packing list
		user.save(function() {
			packingList = {
				name: 'Packing list Name'
			};

			done();
		});
	});

	it('should be able to save Packing list instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Packing list
				agent.post('/packing-lists')
					.send(packingList)
					.expect(200)
					.end(function(packingListSaveErr, packingListSaveRes) {
						// Handle Packing list save error
						if (packingListSaveErr) done(packingListSaveErr);

						// Get a list of Packing lists
						agent.get('/packing-lists')
							.end(function(packingListsGetErr, packingListsGetRes) {
								// Handle Packing list save error
								if (packingListsGetErr) done(packingListsGetErr);

								// Get Packing lists list
								var packingLists = packingListsGetRes.body;

								// Set assertions
								(packingLists[0].user._id).should.equal(userId);
								(packingLists[0].name).should.match('Packing list Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Packing list instance if not logged in', function(done) {
		agent.post('/packing-lists')
			.send(packingList)
			.expect(401)
			.end(function(packingListSaveErr, packingListSaveRes) {
				// Call the assertion callback
				done(packingListSaveErr);
			});
	});

	it('should not be able to save Packing list instance if no name is provided', function(done) {
		// Invalidate name field
		packingList.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Packing list
				agent.post('/packing-lists')
					.send(packingList)
					.expect(400)
					.end(function(packingListSaveErr, packingListSaveRes) {
						// Set message assertion
						(packingListSaveRes.body.message).should.match('Please fill Packing list name');
						
						// Handle Packing list save error
						done(packingListSaveErr);
					});
			});
	});

	it('should be able to update Packing list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Packing list
				agent.post('/packing-lists')
					.send(packingList)
					.expect(200)
					.end(function(packingListSaveErr, packingListSaveRes) {
						// Handle Packing list save error
						if (packingListSaveErr) done(packingListSaveErr);

						// Update Packing list name
						packingList.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Packing list
						agent.put('/packing-lists/' + packingListSaveRes.body._id)
							.send(packingList)
							.expect(200)
							.end(function(packingListUpdateErr, packingListUpdateRes) {
								// Handle Packing list update error
								if (packingListUpdateErr) done(packingListUpdateErr);

								// Set assertions
								(packingListUpdateRes.body._id).should.equal(packingListSaveRes.body._id);
								(packingListUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Packing lists if not signed in', function(done) {
		// Create new Packing list model instance
		var packingListObj = new PackingList(packingList);

		// Save the Packing list
		packingListObj.save(function() {
			// Request Packing lists
			request(app).get('/packing-lists')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Packing list if not signed in', function(done) {
		// Create new Packing list model instance
		var packingListObj = new PackingList(packingList);

		// Save the Packing list
		packingListObj.save(function() {
			request(app).get('/packing-lists/' + packingListObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', packingList.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Packing list instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Packing list
				agent.post('/packing-lists')
					.send(packingList)
					.expect(200)
					.end(function(packingListSaveErr, packingListSaveRes) {
						// Handle Packing list save error
						if (packingListSaveErr) done(packingListSaveErr);

						// Delete existing Packing list
						agent.delete('/packing-lists/' + packingListSaveRes.body._id)
							.send(packingList)
							.expect(200)
							.end(function(packingListDeleteErr, packingListDeleteRes) {
								// Handle Packing list error error
								if (packingListDeleteErr) done(packingListDeleteErr);

								// Set assertions
								(packingListDeleteRes.body._id).should.equal(packingListSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Packing list instance if not signed in', function(done) {
		// Set Packing list user 
		packingList.user = user;

		// Create new Packing list model instance
		var packingListObj = new PackingList(packingList);

		// Save the Packing list
		packingListObj.save(function() {
			// Try deleting Packing list
			request(app).delete('/packing-lists/' + packingListObj._id)
			.expect(401)
			.end(function(packingListDeleteErr, packingListDeleteRes) {
				// Set message assertion
				(packingListDeleteRes.body.message).should.match('User is not logged in');

				// Handle Packing list error error
				done(packingListDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PackingList.remove().exec();
		done();
	});
});