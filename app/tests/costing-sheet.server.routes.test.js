'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CostingSheet = mongoose.model('CostingSheet'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, costingSheet;

/**
 * Costing sheet routes tests
 */
describe('Costing sheet CRUD tests', function() {
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

		// Save a user to the test db and create new Costing sheet
		user.save(function() {
			costingSheet = {
				name: 'Costing sheet Name'
			};

			done();
		});
	});

	it('should be able to save Costing sheet instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Costing sheet
				agent.post('/costing-sheets')
					.send(costingSheet)
					.expect(200)
					.end(function(costingSheetSaveErr, costingSheetSaveRes) {
						// Handle Costing sheet save error
						if (costingSheetSaveErr) done(costingSheetSaveErr);

						// Get a list of Costing sheets
						agent.get('/costing-sheets')
							.end(function(costingSheetsGetErr, costingSheetsGetRes) {
								// Handle Costing sheet save error
								if (costingSheetsGetErr) done(costingSheetsGetErr);

								// Get Costing sheets list
								var costingSheets = costingSheetsGetRes.body;

								// Set assertions
								(costingSheets[0].user._id).should.equal(userId);
								(costingSheets[0].name).should.match('Costing sheet Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Costing sheet instance if not logged in', function(done) {
		agent.post('/costing-sheets')
			.send(costingSheet)
			.expect(401)
			.end(function(costingSheetSaveErr, costingSheetSaveRes) {
				// Call the assertion callback
				done(costingSheetSaveErr);
			});
	});

	it('should not be able to save Costing sheet instance if no name is provided', function(done) {
		// Invalidate name field
		costingSheet.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Costing sheet
				agent.post('/costing-sheets')
					.send(costingSheet)
					.expect(400)
					.end(function(costingSheetSaveErr, costingSheetSaveRes) {
						// Set message assertion
						(costingSheetSaveRes.body.message).should.match('Please fill Costing sheet name');
						
						// Handle Costing sheet save error
						done(costingSheetSaveErr);
					});
			});
	});

	it('should be able to update Costing sheet instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Costing sheet
				agent.post('/costing-sheets')
					.send(costingSheet)
					.expect(200)
					.end(function(costingSheetSaveErr, costingSheetSaveRes) {
						// Handle Costing sheet save error
						if (costingSheetSaveErr) done(costingSheetSaveErr);

						// Update Costing sheet name
						costingSheet.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Costing sheet
						agent.put('/costing-sheets/' + costingSheetSaveRes.body._id)
							.send(costingSheet)
							.expect(200)
							.end(function(costingSheetUpdateErr, costingSheetUpdateRes) {
								// Handle Costing sheet update error
								if (costingSheetUpdateErr) done(costingSheetUpdateErr);

								// Set assertions
								(costingSheetUpdateRes.body._id).should.equal(costingSheetSaveRes.body._id);
								(costingSheetUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Costing sheets if not signed in', function(done) {
		// Create new Costing sheet model instance
		var costingSheetObj = new CostingSheet(costingSheet);

		// Save the Costing sheet
		costingSheetObj.save(function() {
			// Request Costing sheets
			request(app).get('/costing-sheets')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Costing sheet if not signed in', function(done) {
		// Create new Costing sheet model instance
		var costingSheetObj = new CostingSheet(costingSheet);

		// Save the Costing sheet
		costingSheetObj.save(function() {
			request(app).get('/costing-sheets/' + costingSheetObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', costingSheet.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Costing sheet instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Costing sheet
				agent.post('/costing-sheets')
					.send(costingSheet)
					.expect(200)
					.end(function(costingSheetSaveErr, costingSheetSaveRes) {
						// Handle Costing sheet save error
						if (costingSheetSaveErr) done(costingSheetSaveErr);

						// Delete existing Costing sheet
						agent.delete('/costing-sheets/' + costingSheetSaveRes.body._id)
							.send(costingSheet)
							.expect(200)
							.end(function(costingSheetDeleteErr, costingSheetDeleteRes) {
								// Handle Costing sheet error error
								if (costingSheetDeleteErr) done(costingSheetDeleteErr);

								// Set assertions
								(costingSheetDeleteRes.body._id).should.equal(costingSheetSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Costing sheet instance if not signed in', function(done) {
		// Set Costing sheet user 
		costingSheet.user = user;

		// Create new Costing sheet model instance
		var costingSheetObj = new CostingSheet(costingSheet);

		// Save the Costing sheet
		costingSheetObj.save(function() {
			// Try deleting Costing sheet
			request(app).delete('/costing-sheets/' + costingSheetObj._id)
			.expect(401)
			.end(function(costingSheetDeleteErr, costingSheetDeleteRes) {
				// Set message assertion
				(costingSheetDeleteRes.body.message).should.match('User is not logged in');

				// Handle Costing sheet error error
				done(costingSheetDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		CostingSheet.remove().exec();
		done();
	});
});