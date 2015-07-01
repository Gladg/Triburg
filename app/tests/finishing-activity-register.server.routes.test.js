'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FinishingActivityRegister = mongoose.model('FinishingActivityRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, finishingActivityRegister;

/**
 * Finishing activity register routes tests
 */
describe('Finishing activity register CRUD tests', function() {
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

		// Save a user to the test db and create new Finishing activity register
		user.save(function() {
			finishingActivityRegister = {
				name: 'Finishing activity register Name'
			};

			done();
		});
	});

	it('should be able to save Finishing activity register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Finishing activity register
				agent.post('/finishing-activity-registers')
					.send(finishingActivityRegister)
					.expect(200)
					.end(function(finishingActivityRegisterSaveErr, finishingActivityRegisterSaveRes) {
						// Handle Finishing activity register save error
						if (finishingActivityRegisterSaveErr) done(finishingActivityRegisterSaveErr);

						// Get a list of Finishing activity registers
						agent.get('/finishing-activity-registers')
							.end(function(finishingActivityRegistersGetErr, finishingActivityRegistersGetRes) {
								// Handle Finishing activity register save error
								if (finishingActivityRegistersGetErr) done(finishingActivityRegistersGetErr);

								// Get Finishing activity registers list
								var finishingActivityRegisters = finishingActivityRegistersGetRes.body;

								// Set assertions
								(finishingActivityRegisters[0].user._id).should.equal(userId);
								(finishingActivityRegisters[0].name).should.match('Finishing activity register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Finishing activity register instance if not logged in', function(done) {
		agent.post('/finishing-activity-registers')
			.send(finishingActivityRegister)
			.expect(401)
			.end(function(finishingActivityRegisterSaveErr, finishingActivityRegisterSaveRes) {
				// Call the assertion callback
				done(finishingActivityRegisterSaveErr);
			});
	});

	it('should not be able to save Finishing activity register instance if no name is provided', function(done) {
		// Invalidate name field
		finishingActivityRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Finishing activity register
				agent.post('/finishing-activity-registers')
					.send(finishingActivityRegister)
					.expect(400)
					.end(function(finishingActivityRegisterSaveErr, finishingActivityRegisterSaveRes) {
						// Set message assertion
						(finishingActivityRegisterSaveRes.body.message).should.match('Please fill Finishing activity register name');
						
						// Handle Finishing activity register save error
						done(finishingActivityRegisterSaveErr);
					});
			});
	});

	it('should be able to update Finishing activity register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Finishing activity register
				agent.post('/finishing-activity-registers')
					.send(finishingActivityRegister)
					.expect(200)
					.end(function(finishingActivityRegisterSaveErr, finishingActivityRegisterSaveRes) {
						// Handle Finishing activity register save error
						if (finishingActivityRegisterSaveErr) done(finishingActivityRegisterSaveErr);

						// Update Finishing activity register name
						finishingActivityRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Finishing activity register
						agent.put('/finishing-activity-registers/' + finishingActivityRegisterSaveRes.body._id)
							.send(finishingActivityRegister)
							.expect(200)
							.end(function(finishingActivityRegisterUpdateErr, finishingActivityRegisterUpdateRes) {
								// Handle Finishing activity register update error
								if (finishingActivityRegisterUpdateErr) done(finishingActivityRegisterUpdateErr);

								// Set assertions
								(finishingActivityRegisterUpdateRes.body._id).should.equal(finishingActivityRegisterSaveRes.body._id);
								(finishingActivityRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Finishing activity registers if not signed in', function(done) {
		// Create new Finishing activity register model instance
		var finishingActivityRegisterObj = new FinishingActivityRegister(finishingActivityRegister);

		// Save the Finishing activity register
		finishingActivityRegisterObj.save(function() {
			// Request Finishing activity registers
			request(app).get('/finishing-activity-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Finishing activity register if not signed in', function(done) {
		// Create new Finishing activity register model instance
		var finishingActivityRegisterObj = new FinishingActivityRegister(finishingActivityRegister);

		// Save the Finishing activity register
		finishingActivityRegisterObj.save(function() {
			request(app).get('/finishing-activity-registers/' + finishingActivityRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', finishingActivityRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Finishing activity register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Finishing activity register
				agent.post('/finishing-activity-registers')
					.send(finishingActivityRegister)
					.expect(200)
					.end(function(finishingActivityRegisterSaveErr, finishingActivityRegisterSaveRes) {
						// Handle Finishing activity register save error
						if (finishingActivityRegisterSaveErr) done(finishingActivityRegisterSaveErr);

						// Delete existing Finishing activity register
						agent.delete('/finishing-activity-registers/' + finishingActivityRegisterSaveRes.body._id)
							.send(finishingActivityRegister)
							.expect(200)
							.end(function(finishingActivityRegisterDeleteErr, finishingActivityRegisterDeleteRes) {
								// Handle Finishing activity register error error
								if (finishingActivityRegisterDeleteErr) done(finishingActivityRegisterDeleteErr);

								// Set assertions
								(finishingActivityRegisterDeleteRes.body._id).should.equal(finishingActivityRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Finishing activity register instance if not signed in', function(done) {
		// Set Finishing activity register user 
		finishingActivityRegister.user = user;

		// Create new Finishing activity register model instance
		var finishingActivityRegisterObj = new FinishingActivityRegister(finishingActivityRegister);

		// Save the Finishing activity register
		finishingActivityRegisterObj.save(function() {
			// Try deleting Finishing activity register
			request(app).delete('/finishing-activity-registers/' + finishingActivityRegisterObj._id)
			.expect(401)
			.end(function(finishingActivityRegisterDeleteErr, finishingActivityRegisterDeleteRes) {
				// Set message assertion
				(finishingActivityRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Finishing activity register error error
				done(finishingActivityRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FinishingActivityRegister.remove().exec();
		done();
	});
});