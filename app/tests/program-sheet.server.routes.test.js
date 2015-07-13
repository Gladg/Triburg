'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProgramSheet = mongoose.model('ProgramSheet'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, programSheet;

/**
 * Program sheet routes tests
 */
describe('Program sheet CRUD tests', function() {
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

		// Save a user to the test db and create new Program sheet
		user.save(function() {
			programSheet = {
				name: 'Program sheet Name'
			};

			done();
		});
	});

	it('should be able to save Program sheet instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Program sheet
				agent.post('/program-sheets')
					.send(programSheet)
					.expect(200)
					.end(function(programSheetSaveErr, programSheetSaveRes) {
						// Handle Program sheet save error
						if (programSheetSaveErr) done(programSheetSaveErr);

						// Get a list of Program sheets
						agent.get('/program-sheets')
							.end(function(programSheetsGetErr, programSheetsGetRes) {
								// Handle Program sheet save error
								if (programSheetsGetErr) done(programSheetsGetErr);

								// Get Program sheets list
								var programSheets = programSheetsGetRes.body;

								// Set assertions
								(programSheets[0].user._id).should.equal(userId);
								(programSheets[0].name).should.match('Program sheet Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Program sheet instance if not logged in', function(done) {
		agent.post('/program-sheets')
			.send(programSheet)
			.expect(401)
			.end(function(programSheetSaveErr, programSheetSaveRes) {
				// Call the assertion callback
				done(programSheetSaveErr);
			});
	});

	it('should not be able to save Program sheet instance if no name is provided', function(done) {
		// Invalidate name field
		programSheet.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Program sheet
				agent.post('/program-sheets')
					.send(programSheet)
					.expect(400)
					.end(function(programSheetSaveErr, programSheetSaveRes) {
						// Set message assertion
						(programSheetSaveRes.body.message).should.match('Please fill Program sheet name');
						
						// Handle Program sheet save error
						done(programSheetSaveErr);
					});
			});
	});

	it('should be able to update Program sheet instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Program sheet
				agent.post('/program-sheets')
					.send(programSheet)
					.expect(200)
					.end(function(programSheetSaveErr, programSheetSaveRes) {
						// Handle Program sheet save error
						if (programSheetSaveErr) done(programSheetSaveErr);

						// Update Program sheet name
						programSheet.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Program sheet
						agent.put('/program-sheets/' + programSheetSaveRes.body._id)
							.send(programSheet)
							.expect(200)
							.end(function(programSheetUpdateErr, programSheetUpdateRes) {
								// Handle Program sheet update error
								if (programSheetUpdateErr) done(programSheetUpdateErr);

								// Set assertions
								(programSheetUpdateRes.body._id).should.equal(programSheetSaveRes.body._id);
								(programSheetUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Program sheets if not signed in', function(done) {
		// Create new Program sheet model instance
		var programSheetObj = new ProgramSheet(programSheet);

		// Save the Program sheet
		programSheetObj.save(function() {
			// Request Program sheets
			request(app).get('/program-sheets')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Program sheet if not signed in', function(done) {
		// Create new Program sheet model instance
		var programSheetObj = new ProgramSheet(programSheet);

		// Save the Program sheet
		programSheetObj.save(function() {
			request(app).get('/program-sheets/' + programSheetObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', programSheet.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Program sheet instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Program sheet
				agent.post('/program-sheets')
					.send(programSheet)
					.expect(200)
					.end(function(programSheetSaveErr, programSheetSaveRes) {
						// Handle Program sheet save error
						if (programSheetSaveErr) done(programSheetSaveErr);

						// Delete existing Program sheet
						agent.delete('/program-sheets/' + programSheetSaveRes.body._id)
							.send(programSheet)
							.expect(200)
							.end(function(programSheetDeleteErr, programSheetDeleteRes) {
								// Handle Program sheet error error
								if (programSheetDeleteErr) done(programSheetDeleteErr);

								// Set assertions
								(programSheetDeleteRes.body._id).should.equal(programSheetSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Program sheet instance if not signed in', function(done) {
		// Set Program sheet user 
		programSheet.user = user;

		// Create new Program sheet model instance
		var programSheetObj = new ProgramSheet(programSheet);

		// Save the Program sheet
		programSheetObj.save(function() {
			// Try deleting Program sheet
			request(app).delete('/program-sheets/' + programSheetObj._id)
			.expect(401)
			.end(function(programSheetDeleteErr, programSheetDeleteRes) {
				// Set message assertion
				(programSheetDeleteRes.body.message).should.match('User is not logged in');

				// Handle Program sheet error error
				done(programSheetDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProgramSheet.remove().exec();
		done();
	});
});