'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	CuttingRegister = mongoose.model('CuttingRegister'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, cuttingRegister;

/**
 * Cutting register routes tests
 */
describe('Cutting register CRUD tests', function() {
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

		// Save a user to the test db and create new Cutting register
		user.save(function() {
			cuttingRegister = {
				name: 'Cutting register Name'
			};

			done();
		});
	});

	it('should be able to save Cutting register instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cutting register
				agent.post('/cutting-registers')
					.send(cuttingRegister)
					.expect(200)
					.end(function(cuttingRegisterSaveErr, cuttingRegisterSaveRes) {
						// Handle Cutting register save error
						if (cuttingRegisterSaveErr) done(cuttingRegisterSaveErr);

						// Get a list of Cutting registers
						agent.get('/cutting-registers')
							.end(function(cuttingRegistersGetErr, cuttingRegistersGetRes) {
								// Handle Cutting register save error
								if (cuttingRegistersGetErr) done(cuttingRegistersGetErr);

								// Get Cutting registers list
								var cuttingRegisters = cuttingRegistersGetRes.body;

								// Set assertions
								(cuttingRegisters[0].user._id).should.equal(userId);
								(cuttingRegisters[0].name).should.match('Cutting register Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Cutting register instance if not logged in', function(done) {
		agent.post('/cutting-registers')
			.send(cuttingRegister)
			.expect(401)
			.end(function(cuttingRegisterSaveErr, cuttingRegisterSaveRes) {
				// Call the assertion callback
				done(cuttingRegisterSaveErr);
			});
	});

	it('should not be able to save Cutting register instance if no name is provided', function(done) {
		// Invalidate name field
		cuttingRegister.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cutting register
				agent.post('/cutting-registers')
					.send(cuttingRegister)
					.expect(400)
					.end(function(cuttingRegisterSaveErr, cuttingRegisterSaveRes) {
						// Set message assertion
						(cuttingRegisterSaveRes.body.message).should.match('Please fill Cutting register name');
						
						// Handle Cutting register save error
						done(cuttingRegisterSaveErr);
					});
			});
	});

	it('should be able to update Cutting register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cutting register
				agent.post('/cutting-registers')
					.send(cuttingRegister)
					.expect(200)
					.end(function(cuttingRegisterSaveErr, cuttingRegisterSaveRes) {
						// Handle Cutting register save error
						if (cuttingRegisterSaveErr) done(cuttingRegisterSaveErr);

						// Update Cutting register name
						cuttingRegister.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Cutting register
						agent.put('/cutting-registers/' + cuttingRegisterSaveRes.body._id)
							.send(cuttingRegister)
							.expect(200)
							.end(function(cuttingRegisterUpdateErr, cuttingRegisterUpdateRes) {
								// Handle Cutting register update error
								if (cuttingRegisterUpdateErr) done(cuttingRegisterUpdateErr);

								// Set assertions
								(cuttingRegisterUpdateRes.body._id).should.equal(cuttingRegisterSaveRes.body._id);
								(cuttingRegisterUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Cutting registers if not signed in', function(done) {
		// Create new Cutting register model instance
		var cuttingRegisterObj = new CuttingRegister(cuttingRegister);

		// Save the Cutting register
		cuttingRegisterObj.save(function() {
			// Request Cutting registers
			request(app).get('/cutting-registers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Cutting register if not signed in', function(done) {
		// Create new Cutting register model instance
		var cuttingRegisterObj = new CuttingRegister(cuttingRegister);

		// Save the Cutting register
		cuttingRegisterObj.save(function() {
			request(app).get('/cutting-registers/' + cuttingRegisterObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', cuttingRegister.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Cutting register instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cutting register
				agent.post('/cutting-registers')
					.send(cuttingRegister)
					.expect(200)
					.end(function(cuttingRegisterSaveErr, cuttingRegisterSaveRes) {
						// Handle Cutting register save error
						if (cuttingRegisterSaveErr) done(cuttingRegisterSaveErr);

						// Delete existing Cutting register
						agent.delete('/cutting-registers/' + cuttingRegisterSaveRes.body._id)
							.send(cuttingRegister)
							.expect(200)
							.end(function(cuttingRegisterDeleteErr, cuttingRegisterDeleteRes) {
								// Handle Cutting register error error
								if (cuttingRegisterDeleteErr) done(cuttingRegisterDeleteErr);

								// Set assertions
								(cuttingRegisterDeleteRes.body._id).should.equal(cuttingRegisterSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Cutting register instance if not signed in', function(done) {
		// Set Cutting register user 
		cuttingRegister.user = user;

		// Create new Cutting register model instance
		var cuttingRegisterObj = new CuttingRegister(cuttingRegister);

		// Save the Cutting register
		cuttingRegisterObj.save(function() {
			// Try deleting Cutting register
			request(app).delete('/cutting-registers/' + cuttingRegisterObj._id)
			.expect(401)
			.end(function(cuttingRegisterDeleteErr, cuttingRegisterDeleteRes) {
				// Set message assertion
				(cuttingRegisterDeleteRes.body.message).should.match('User is not logged in');

				// Handle Cutting register error error
				done(cuttingRegisterDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		CuttingRegister.remove().exec();
		done();
	});
});