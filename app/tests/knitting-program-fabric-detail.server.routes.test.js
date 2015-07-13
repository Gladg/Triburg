'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	KnittingProgramFabricDetail = mongoose.model('KnittingProgramFabricDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, knittingProgramFabricDetail;

/**
 * Knitting program fabric detail routes tests
 */
describe('Knitting program fabric detail CRUD tests', function() {
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

		// Save a user to the test db and create new Knitting program fabric detail
		user.save(function() {
			knittingProgramFabricDetail = {
				name: 'Knitting program fabric detail Name'
			};

			done();
		});
	});

	it('should be able to save Knitting program fabric detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program fabric detail
				agent.post('/knitting-program-fabric-details')
					.send(knittingProgramFabricDetail)
					.expect(200)
					.end(function(knittingProgramFabricDetailSaveErr, knittingProgramFabricDetailSaveRes) {
						// Handle Knitting program fabric detail save error
						if (knittingProgramFabricDetailSaveErr) done(knittingProgramFabricDetailSaveErr);

						// Get a list of Knitting program fabric details
						agent.get('/knitting-program-fabric-details')
							.end(function(knittingProgramFabricDetailsGetErr, knittingProgramFabricDetailsGetRes) {
								// Handle Knitting program fabric detail save error
								if (knittingProgramFabricDetailsGetErr) done(knittingProgramFabricDetailsGetErr);

								// Get Knitting program fabric details list
								var knittingProgramFabricDetails = knittingProgramFabricDetailsGetRes.body;

								// Set assertions
								(knittingProgramFabricDetails[0].user._id).should.equal(userId);
								(knittingProgramFabricDetails[0].name).should.match('Knitting program fabric detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Knitting program fabric detail instance if not logged in', function(done) {
		agent.post('/knitting-program-fabric-details')
			.send(knittingProgramFabricDetail)
			.expect(401)
			.end(function(knittingProgramFabricDetailSaveErr, knittingProgramFabricDetailSaveRes) {
				// Call the assertion callback
				done(knittingProgramFabricDetailSaveErr);
			});
	});

	it('should not be able to save Knitting program fabric detail instance if no name is provided', function(done) {
		// Invalidate name field
		knittingProgramFabricDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program fabric detail
				agent.post('/knitting-program-fabric-details')
					.send(knittingProgramFabricDetail)
					.expect(400)
					.end(function(knittingProgramFabricDetailSaveErr, knittingProgramFabricDetailSaveRes) {
						// Set message assertion
						(knittingProgramFabricDetailSaveRes.body.message).should.match('Please fill Knitting program fabric detail name');
						
						// Handle Knitting program fabric detail save error
						done(knittingProgramFabricDetailSaveErr);
					});
			});
	});

	it('should be able to update Knitting program fabric detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program fabric detail
				agent.post('/knitting-program-fabric-details')
					.send(knittingProgramFabricDetail)
					.expect(200)
					.end(function(knittingProgramFabricDetailSaveErr, knittingProgramFabricDetailSaveRes) {
						// Handle Knitting program fabric detail save error
						if (knittingProgramFabricDetailSaveErr) done(knittingProgramFabricDetailSaveErr);

						// Update Knitting program fabric detail name
						knittingProgramFabricDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Knitting program fabric detail
						agent.put('/knitting-program-fabric-details/' + knittingProgramFabricDetailSaveRes.body._id)
							.send(knittingProgramFabricDetail)
							.expect(200)
							.end(function(knittingProgramFabricDetailUpdateErr, knittingProgramFabricDetailUpdateRes) {
								// Handle Knitting program fabric detail update error
								if (knittingProgramFabricDetailUpdateErr) done(knittingProgramFabricDetailUpdateErr);

								// Set assertions
								(knittingProgramFabricDetailUpdateRes.body._id).should.equal(knittingProgramFabricDetailSaveRes.body._id);
								(knittingProgramFabricDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Knitting program fabric details if not signed in', function(done) {
		// Create new Knitting program fabric detail model instance
		var knittingProgramFabricDetailObj = new KnittingProgramFabricDetail(knittingProgramFabricDetail);

		// Save the Knitting program fabric detail
		knittingProgramFabricDetailObj.save(function() {
			// Request Knitting program fabric details
			request(app).get('/knitting-program-fabric-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Knitting program fabric detail if not signed in', function(done) {
		// Create new Knitting program fabric detail model instance
		var knittingProgramFabricDetailObj = new KnittingProgramFabricDetail(knittingProgramFabricDetail);

		// Save the Knitting program fabric detail
		knittingProgramFabricDetailObj.save(function() {
			request(app).get('/knitting-program-fabric-details/' + knittingProgramFabricDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', knittingProgramFabricDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Knitting program fabric detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Knitting program fabric detail
				agent.post('/knitting-program-fabric-details')
					.send(knittingProgramFabricDetail)
					.expect(200)
					.end(function(knittingProgramFabricDetailSaveErr, knittingProgramFabricDetailSaveRes) {
						// Handle Knitting program fabric detail save error
						if (knittingProgramFabricDetailSaveErr) done(knittingProgramFabricDetailSaveErr);

						// Delete existing Knitting program fabric detail
						agent.delete('/knitting-program-fabric-details/' + knittingProgramFabricDetailSaveRes.body._id)
							.send(knittingProgramFabricDetail)
							.expect(200)
							.end(function(knittingProgramFabricDetailDeleteErr, knittingProgramFabricDetailDeleteRes) {
								// Handle Knitting program fabric detail error error
								if (knittingProgramFabricDetailDeleteErr) done(knittingProgramFabricDetailDeleteErr);

								// Set assertions
								(knittingProgramFabricDetailDeleteRes.body._id).should.equal(knittingProgramFabricDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Knitting program fabric detail instance if not signed in', function(done) {
		// Set Knitting program fabric detail user 
		knittingProgramFabricDetail.user = user;

		// Create new Knitting program fabric detail model instance
		var knittingProgramFabricDetailObj = new KnittingProgramFabricDetail(knittingProgramFabricDetail);

		// Save the Knitting program fabric detail
		knittingProgramFabricDetailObj.save(function() {
			// Try deleting Knitting program fabric detail
			request(app).delete('/knitting-program-fabric-details/' + knittingProgramFabricDetailObj._id)
			.expect(401)
			.end(function(knittingProgramFabricDetailDeleteErr, knittingProgramFabricDetailDeleteRes) {
				// Set message assertion
				(knittingProgramFabricDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Knitting program fabric detail error error
				done(knittingProgramFabricDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		KnittingProgramFabricDetail.remove().exec();
		done();
	});
});