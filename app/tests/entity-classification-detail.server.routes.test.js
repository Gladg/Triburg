'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityClassificationDetail = mongoose.model('EntityClassificationDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, entityClassificationDetail;

/**
 * Entity classification detail routes tests
 */
describe('Entity classification detail CRUD tests', function() {
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

		// Save a user to the test db and create new Entity classification detail
		user.save(function() {
			entityClassificationDetail = {
				name: 'Entity classification detail Name'
			};

			done();
		});
	});

	it('should be able to save Entity classification detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification detail
				agent.post('/entity-classification-details')
					.send(entityClassificationDetail)
					.expect(200)
					.end(function(entityClassificationDetailSaveErr, entityClassificationDetailSaveRes) {
						// Handle Entity classification detail save error
						if (entityClassificationDetailSaveErr) done(entityClassificationDetailSaveErr);

						// Get a list of Entity classification details
						agent.get('/entity-classification-details')
							.end(function(entityClassificationDetailsGetErr, entityClassificationDetailsGetRes) {
								// Handle Entity classification detail save error
								if (entityClassificationDetailsGetErr) done(entityClassificationDetailsGetErr);

								// Get Entity classification details list
								var entityClassificationDetails = entityClassificationDetailsGetRes.body;

								// Set assertions
								(entityClassificationDetails[0].user._id).should.equal(userId);
								(entityClassificationDetails[0].name).should.match('Entity classification detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Entity classification detail instance if not logged in', function(done) {
		agent.post('/entity-classification-details')
			.send(entityClassificationDetail)
			.expect(401)
			.end(function(entityClassificationDetailSaveErr, entityClassificationDetailSaveRes) {
				// Call the assertion callback
				done(entityClassificationDetailSaveErr);
			});
	});

	it('should not be able to save Entity classification detail instance if no name is provided', function(done) {
		// Invalidate name field
		entityClassificationDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification detail
				agent.post('/entity-classification-details')
					.send(entityClassificationDetail)
					.expect(400)
					.end(function(entityClassificationDetailSaveErr, entityClassificationDetailSaveRes) {
						// Set message assertion
						(entityClassificationDetailSaveRes.body.message).should.match('Please fill Entity classification detail name');
						
						// Handle Entity classification detail save error
						done(entityClassificationDetailSaveErr);
					});
			});
	});

	it('should be able to update Entity classification detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification detail
				agent.post('/entity-classification-details')
					.send(entityClassificationDetail)
					.expect(200)
					.end(function(entityClassificationDetailSaveErr, entityClassificationDetailSaveRes) {
						// Handle Entity classification detail save error
						if (entityClassificationDetailSaveErr) done(entityClassificationDetailSaveErr);

						// Update Entity classification detail name
						entityClassificationDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Entity classification detail
						agent.put('/entity-classification-details/' + entityClassificationDetailSaveRes.body._id)
							.send(entityClassificationDetail)
							.expect(200)
							.end(function(entityClassificationDetailUpdateErr, entityClassificationDetailUpdateRes) {
								// Handle Entity classification detail update error
								if (entityClassificationDetailUpdateErr) done(entityClassificationDetailUpdateErr);

								// Set assertions
								(entityClassificationDetailUpdateRes.body._id).should.equal(entityClassificationDetailSaveRes.body._id);
								(entityClassificationDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Entity classification details if not signed in', function(done) {
		// Create new Entity classification detail model instance
		var entityClassificationDetailObj = new EntityClassificationDetail(entityClassificationDetail);

		// Save the Entity classification detail
		entityClassificationDetailObj.save(function() {
			// Request Entity classification details
			request(app).get('/entity-classification-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Entity classification detail if not signed in', function(done) {
		// Create new Entity classification detail model instance
		var entityClassificationDetailObj = new EntityClassificationDetail(entityClassificationDetail);

		// Save the Entity classification detail
		entityClassificationDetailObj.save(function() {
			request(app).get('/entity-classification-details/' + entityClassificationDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', entityClassificationDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Entity classification detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification detail
				agent.post('/entity-classification-details')
					.send(entityClassificationDetail)
					.expect(200)
					.end(function(entityClassificationDetailSaveErr, entityClassificationDetailSaveRes) {
						// Handle Entity classification detail save error
						if (entityClassificationDetailSaveErr) done(entityClassificationDetailSaveErr);

						// Delete existing Entity classification detail
						agent.delete('/entity-classification-details/' + entityClassificationDetailSaveRes.body._id)
							.send(entityClassificationDetail)
							.expect(200)
							.end(function(entityClassificationDetailDeleteErr, entityClassificationDetailDeleteRes) {
								// Handle Entity classification detail error error
								if (entityClassificationDetailDeleteErr) done(entityClassificationDetailDeleteErr);

								// Set assertions
								(entityClassificationDetailDeleteRes.body._id).should.equal(entityClassificationDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Entity classification detail instance if not signed in', function(done) {
		// Set Entity classification detail user 
		entityClassificationDetail.user = user;

		// Create new Entity classification detail model instance
		var entityClassificationDetailObj = new EntityClassificationDetail(entityClassificationDetail);

		// Save the Entity classification detail
		entityClassificationDetailObj.save(function() {
			// Try deleting Entity classification detail
			request(app).delete('/entity-classification-details/' + entityClassificationDetailObj._id)
			.expect(401)
			.end(function(entityClassificationDetailDeleteErr, entityClassificationDetailDeleteRes) {
				// Set message assertion
				(entityClassificationDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Entity classification detail error error
				done(entityClassificationDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EntityClassificationDetail.remove().exec();
		done();
	});
});