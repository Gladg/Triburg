'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProcessProgram = mongoose.model('ProcessProgram'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, processProgram;

/**
 * Process program routes tests
 */
describe('Process program CRUD tests', function() {
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

		// Save a user to the test db and create new Process program
		user.save(function() {
			processProgram = {
				name: 'Process program Name'
			};

			done();
		});
	});

	it('should be able to save Process program instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Process program
				agent.post('/process-programs')
					.send(processProgram)
					.expect(200)
					.end(function(processProgramSaveErr, processProgramSaveRes) {
						// Handle Process program save error
						if (processProgramSaveErr) done(processProgramSaveErr);

						// Get a list of Process programs
						agent.get('/process-programs')
							.end(function(processProgramsGetErr, processProgramsGetRes) {
								// Handle Process program save error
								if (processProgramsGetErr) done(processProgramsGetErr);

								// Get Process programs list
								var processPrograms = processProgramsGetRes.body;

								// Set assertions
								(processPrograms[0].user._id).should.equal(userId);
								(processPrograms[0].name).should.match('Process program Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Process program instance if not logged in', function(done) {
		agent.post('/process-programs')
			.send(processProgram)
			.expect(401)
			.end(function(processProgramSaveErr, processProgramSaveRes) {
				// Call the assertion callback
				done(processProgramSaveErr);
			});
	});

	it('should not be able to save Process program instance if no name is provided', function(done) {
		// Invalidate name field
		processProgram.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Process program
				agent.post('/process-programs')
					.send(processProgram)
					.expect(400)
					.end(function(processProgramSaveErr, processProgramSaveRes) {
						// Set message assertion
						(processProgramSaveRes.body.message).should.match('Please fill Process program name');
						
						// Handle Process program save error
						done(processProgramSaveErr);
					});
			});
	});

	it('should be able to update Process program instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Process program
				agent.post('/process-programs')
					.send(processProgram)
					.expect(200)
					.end(function(processProgramSaveErr, processProgramSaveRes) {
						// Handle Process program save error
						if (processProgramSaveErr) done(processProgramSaveErr);

						// Update Process program name
						processProgram.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Process program
						agent.put('/process-programs/' + processProgramSaveRes.body._id)
							.send(processProgram)
							.expect(200)
							.end(function(processProgramUpdateErr, processProgramUpdateRes) {
								// Handle Process program update error
								if (processProgramUpdateErr) done(processProgramUpdateErr);

								// Set assertions
								(processProgramUpdateRes.body._id).should.equal(processProgramSaveRes.body._id);
								(processProgramUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Process programs if not signed in', function(done) {
		// Create new Process program model instance
		var processProgramObj = new ProcessProgram(processProgram);

		// Save the Process program
		processProgramObj.save(function() {
			// Request Process programs
			request(app).get('/process-programs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Process program if not signed in', function(done) {
		// Create new Process program model instance
		var processProgramObj = new ProcessProgram(processProgram);

		// Save the Process program
		processProgramObj.save(function() {
			request(app).get('/process-programs/' + processProgramObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', processProgram.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Process program instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Process program
				agent.post('/process-programs')
					.send(processProgram)
					.expect(200)
					.end(function(processProgramSaveErr, processProgramSaveRes) {
						// Handle Process program save error
						if (processProgramSaveErr) done(processProgramSaveErr);

						// Delete existing Process program
						agent.delete('/process-programs/' + processProgramSaveRes.body._id)
							.send(processProgram)
							.expect(200)
							.end(function(processProgramDeleteErr, processProgramDeleteRes) {
								// Handle Process program error error
								if (processProgramDeleteErr) done(processProgramDeleteErr);

								// Set assertions
								(processProgramDeleteRes.body._id).should.equal(processProgramSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Process program instance if not signed in', function(done) {
		// Set Process program user 
		processProgram.user = user;

		// Create new Process program model instance
		var processProgramObj = new ProcessProgram(processProgram);

		// Save the Process program
		processProgramObj.save(function() {
			// Try deleting Process program
			request(app).delete('/process-programs/' + processProgramObj._id)
			.expect(401)
			.end(function(processProgramDeleteErr, processProgramDeleteRes) {
				// Set message assertion
				(processProgramDeleteRes.body.message).should.match('User is not logged in');

				// Handle Process program error error
				done(processProgramDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProcessProgram.remove().exec();
		done();
	});
});