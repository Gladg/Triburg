'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	KnittingProgram = mongoose.model('KnittingProgram'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, knittingProgram;

/**
 * Knitting program routes tests
 */
describe('Knitting program CRUD tests', function() {
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

		// Save a user to the test db and create new Knitting program
		user.save(function() {
			knittingProgram = {
				name: 'Knitting program Name'
			};

			done();
		});
	});

	it('should be able to save Knitting program instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program
				agent.post('/knitting-programs')
					.send(knittingProgram)
					.expect(200)
					.end(function(knittingProgramSaveErr, knittingProgramSaveRes) {
						// Handle Knitting program save error
						if (knittingProgramSaveErr) done(knittingProgramSaveErr);

						// Get a list of Knitting programs
						agent.get('/knitting-programs')
							.end(function(knittingProgramsGetErr, knittingProgramsGetRes) {
								// Handle Knitting program save error
								if (knittingProgramsGetErr) done(knittingProgramsGetErr);

								// Get Knitting programs list
								var knittingPrograms = knittingProgramsGetRes.body;

								// Set assertions
								(knittingPrograms[0].user._id).should.equal(userId);
								(knittingPrograms[0].name).should.match('Knitting program Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Knitting program instance if not logged in', function(done) {
		agent.post('/knitting-programs')
			.send(knittingProgram)
			.expect(401)
			.end(function(knittingProgramSaveErr, knittingProgramSaveRes) {
				// Call the assertion callback
				done(knittingProgramSaveErr);
			});
	});

	it('should not be able to save Knitting program instance if no name is provided', function(done) {
		// Invalidate name field
		knittingProgram.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program
				agent.post('/knitting-programs')
					.send(knittingProgram)
					.expect(400)
					.end(function(knittingProgramSaveErr, knittingProgramSaveRes) {
						// Set message assertion
						(knittingProgramSaveRes.body.message).should.match('Please fill Knitting program name');
						
						// Handle Knitting program save error
						done(knittingProgramSaveErr);
					});
			});
	});

	it('should be able to update Knitting program instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program
				agent.post('/knitting-programs')
					.send(knittingProgram)
					.expect(200)
					.end(function(knittingProgramSaveErr, knittingProgramSaveRes) {
						// Handle Knitting program save error
						if (knittingProgramSaveErr) done(knittingProgramSaveErr);

						// Update Knitting program name
						knittingProgram.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Knitting program
						agent.put('/knitting-programs/' + knittingProgramSaveRes.body._id)
							.send(knittingProgram)
							.expect(200)
							.end(function(knittingProgramUpdateErr, knittingProgramUpdateRes) {
								// Handle Knitting program update error
								if (knittingProgramUpdateErr) done(knittingProgramUpdateErr);

								// Set assertions
								(knittingProgramUpdateRes.body._id).should.equal(knittingProgramSaveRes.body._id);
								(knittingProgramUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Knitting programs if not signed in', function(done) {
		// Create new Knitting program model instance
		var knittingProgramObj = new KnittingProgram(knittingProgram);

		// Save the Knitting program
		knittingProgramObj.save(function() {
			// Request Knitting programs
			request(app).get('/knitting-programs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Knitting program if not signed in', function(done) {
		// Create new Knitting program model instance
		var knittingProgramObj = new KnittingProgram(knittingProgram);

		// Save the Knitting program
		knittingProgramObj.save(function() {
			request(app).get('/knitting-programs/' + knittingProgramObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', knittingProgram.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Knitting program instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program
				agent.post('/knitting-programs')
					.send(knittingProgram)
					.expect(200)
					.end(function(knittingProgramSaveErr, knittingProgramSaveRes) {
						// Handle Knitting program save error
						if (knittingProgramSaveErr) done(knittingProgramSaveErr);

						// Delete existing Knitting program
						agent.delete('/knitting-programs/' + knittingProgramSaveRes.body._id)
							.send(knittingProgram)
							.expect(200)
							.end(function(knittingProgramDeleteErr, knittingProgramDeleteRes) {
								// Handle Knitting program error error
								if (knittingProgramDeleteErr) done(knittingProgramDeleteErr);

								// Set assertions
								(knittingProgramDeleteRes.body._id).should.equal(knittingProgramSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Knitting program instance if not signed in', function(done) {
		// Set Knitting program user 
		knittingProgram.user = user;

		// Create new Knitting program model instance
		var knittingProgramObj = new KnittingProgram(knittingProgram);

		// Save the Knitting program
		knittingProgramObj.save(function() {
			// Try deleting Knitting program
			request(app).delete('/knitting-programs/' + knittingProgramObj._id)
			.expect(401)
			.end(function(knittingProgramDeleteErr, knittingProgramDeleteRes) {
				// Set message assertion
				(knittingProgramDeleteRes.body.message).should.match('User is not logged in');

				// Handle Knitting program error error
				done(knittingProgramDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		KnittingProgram.remove().exec();
		done();
	});
});