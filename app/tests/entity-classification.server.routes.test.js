'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityClassification = mongoose.model('EntityClassification'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, entityClassification;

/**
 * Entity classification routes tests
 */
describe('Entity classification CRUD tests', function() {
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

		// Save a user to the test db and create new Entity classification
		user.save(function() {
			entityClassification = {
				name: 'Entity classification Name'
			};

			done();
		});
	});

	it('should be able to save Entity classification instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification
				agent.post('/entity-classifications')
					.send(entityClassification)
					.expect(200)
					.end(function(entityClassificationSaveErr, entityClassificationSaveRes) {
						// Handle Entity classification save error
						if (entityClassificationSaveErr) done(entityClassificationSaveErr);

						// Get a list of Entity classifications
						agent.get('/entity-classifications')
							.end(function(entityClassificationsGetErr, entityClassificationsGetRes) {
								// Handle Entity classification save error
								if (entityClassificationsGetErr) done(entityClassificationsGetErr);

								// Get Entity classifications list
								var entityClassifications = entityClassificationsGetRes.body;

								// Set assertions
								(entityClassifications[0].user._id).should.equal(userId);
								(entityClassifications[0].name).should.match('Entity classification Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Entity classification instance if not logged in', function(done) {
		agent.post('/entity-classifications')
			.send(entityClassification)
			.expect(401)
			.end(function(entityClassificationSaveErr, entityClassificationSaveRes) {
				// Call the assertion callback
				done(entityClassificationSaveErr);
			});
	});

	it('should not be able to save Entity classification instance if no name is provided', function(done) {
		// Invalidate name field
		entityClassification.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification
				agent.post('/entity-classifications')
					.send(entityClassification)
					.expect(400)
					.end(function(entityClassificationSaveErr, entityClassificationSaveRes) {
						// Set message assertion
						(entityClassificationSaveRes.body.message).should.match('Please fill Entity classification name');
						
						// Handle Entity classification save error
						done(entityClassificationSaveErr);
					});
			});
	});

	it('should be able to update Entity classification instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification
				agent.post('/entity-classifications')
					.send(entityClassification)
					.expect(200)
					.end(function(entityClassificationSaveErr, entityClassificationSaveRes) {
						// Handle Entity classification save error
						if (entityClassificationSaveErr) done(entityClassificationSaveErr);

						// Update Entity classification name
						entityClassification.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Entity classification
						agent.put('/entity-classifications/' + entityClassificationSaveRes.body._id)
							.send(entityClassification)
							.expect(200)
							.end(function(entityClassificationUpdateErr, entityClassificationUpdateRes) {
								// Handle Entity classification update error
								if (entityClassificationUpdateErr) done(entityClassificationUpdateErr);

								// Set assertions
								(entityClassificationUpdateRes.body._id).should.equal(entityClassificationSaveRes.body._id);
								(entityClassificationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Entity classifications if not signed in', function(done) {
		// Create new Entity classification model instance
		var entityClassificationObj = new EntityClassification(entityClassification);

		// Save the Entity classification
		entityClassificationObj.save(function() {
			// Request Entity classifications
			request(app).get('/entity-classifications')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Entity classification if not signed in', function(done) {
		// Create new Entity classification model instance
		var entityClassificationObj = new EntityClassification(entityClassification);

		// Save the Entity classification
		entityClassificationObj.save(function() {
			request(app).get('/entity-classifications/' + entityClassificationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', entityClassification.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Entity classification instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity classification
				agent.post('/entity-classifications')
					.send(entityClassification)
					.expect(200)
					.end(function(entityClassificationSaveErr, entityClassificationSaveRes) {
						// Handle Entity classification save error
						if (entityClassificationSaveErr) done(entityClassificationSaveErr);

						// Delete existing Entity classification
						agent.delete('/entity-classifications/' + entityClassificationSaveRes.body._id)
							.send(entityClassification)
							.expect(200)
							.end(function(entityClassificationDeleteErr, entityClassificationDeleteRes) {
								// Handle Entity classification error error
								if (entityClassificationDeleteErr) done(entityClassificationDeleteErr);

								// Set assertions
								(entityClassificationDeleteRes.body._id).should.equal(entityClassificationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Entity classification instance if not signed in', function(done) {
		// Set Entity classification user 
		entityClassification.user = user;

		// Create new Entity classification model instance
		var entityClassificationObj = new EntityClassification(entityClassification);

		// Save the Entity classification
		entityClassificationObj.save(function() {
			// Try deleting Entity classification
			request(app).delete('/entity-classifications/' + entityClassificationObj._id)
			.expect(401)
			.end(function(entityClassificationDeleteErr, entityClassificationDeleteRes) {
				// Set message assertion
				(entityClassificationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Entity classification error error
				done(entityClassificationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EntityClassification.remove().exec();
		done();
	});
});