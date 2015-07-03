'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityAttributesDetail = mongoose.model('EntityAttributesDetail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, entityAttributesDetail;

/**
 * Entity attributes detail routes tests
 */
describe('Entity attributes detail CRUD tests', function() {
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

		// Save a user to the test db and create new Entity attributes detail
		user.save(function() {
			entityAttributesDetail = {
				name: 'Entity attributes detail Name'
			};

			done();
		});
	});

	it('should be able to save Entity attributes detail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity attributes detail
				agent.post('/entity-attributes-details')
					.send(entityAttributesDetail)
					.expect(200)
					.end(function(entityAttributesDetailSaveErr, entityAttributesDetailSaveRes) {
						// Handle Entity attributes detail save error
						if (entityAttributesDetailSaveErr) done(entityAttributesDetailSaveErr);

						// Get a list of Entity attributes details
						agent.get('/entity-attributes-details')
							.end(function(entityAttributesDetailsGetErr, entityAttributesDetailsGetRes) {
								// Handle Entity attributes detail save error
								if (entityAttributesDetailsGetErr) done(entityAttributesDetailsGetErr);

								// Get Entity attributes details list
								var entityAttributesDetails = entityAttributesDetailsGetRes.body;

								// Set assertions
								(entityAttributesDetails[0].user._id).should.equal(userId);
								(entityAttributesDetails[0].name).should.match('Entity attributes detail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Entity attributes detail instance if not logged in', function(done) {
		agent.post('/entity-attributes-details')
			.send(entityAttributesDetail)
			.expect(401)
			.end(function(entityAttributesDetailSaveErr, entityAttributesDetailSaveRes) {
				// Call the assertion callback
				done(entityAttributesDetailSaveErr);
			});
	});

	it('should not be able to save Entity attributes detail instance if no name is provided', function(done) {
		// Invalidate name field
		entityAttributesDetail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity attributes detail
				agent.post('/entity-attributes-details')
					.send(entityAttributesDetail)
					.expect(400)
					.end(function(entityAttributesDetailSaveErr, entityAttributesDetailSaveRes) {
						// Set message assertion
						(entityAttributesDetailSaveRes.body.message).should.match('Please fill Entity attributes detail name');
						
						// Handle Entity attributes detail save error
						done(entityAttributesDetailSaveErr);
					});
			});
	});

	it('should be able to update Entity attributes detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity attributes detail
				agent.post('/entity-attributes-details')
					.send(entityAttributesDetail)
					.expect(200)
					.end(function(entityAttributesDetailSaveErr, entityAttributesDetailSaveRes) {
						// Handle Entity attributes detail save error
						if (entityAttributesDetailSaveErr) done(entityAttributesDetailSaveErr);

						// Update Entity attributes detail name
						entityAttributesDetail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Entity attributes detail
						agent.put('/entity-attributes-details/' + entityAttributesDetailSaveRes.body._id)
							.send(entityAttributesDetail)
							.expect(200)
							.end(function(entityAttributesDetailUpdateErr, entityAttributesDetailUpdateRes) {
								// Handle Entity attributes detail update error
								if (entityAttributesDetailUpdateErr) done(entityAttributesDetailUpdateErr);

								// Set assertions
								(entityAttributesDetailUpdateRes.body._id).should.equal(entityAttributesDetailSaveRes.body._id);
								(entityAttributesDetailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Entity attributes details if not signed in', function(done) {
		// Create new Entity attributes detail model instance
		var entityAttributesDetailObj = new EntityAttributesDetail(entityAttributesDetail);

		// Save the Entity attributes detail
		entityAttributesDetailObj.save(function() {
			// Request Entity attributes details
			request(app).get('/entity-attributes-details')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Entity attributes detail if not signed in', function(done) {
		// Create new Entity attributes detail model instance
		var entityAttributesDetailObj = new EntityAttributesDetail(entityAttributesDetail);

		// Save the Entity attributes detail
		entityAttributesDetailObj.save(function() {
			request(app).get('/entity-attributes-details/' + entityAttributesDetailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', entityAttributesDetail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Entity attributes detail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity attributes detail
				agent.post('/entity-attributes-details')
					.send(entityAttributesDetail)
					.expect(200)
					.end(function(entityAttributesDetailSaveErr, entityAttributesDetailSaveRes) {
						// Handle Entity attributes detail save error
						if (entityAttributesDetailSaveErr) done(entityAttributesDetailSaveErr);

						// Delete existing Entity attributes detail
						agent.delete('/entity-attributes-details/' + entityAttributesDetailSaveRes.body._id)
							.send(entityAttributesDetail)
							.expect(200)
							.end(function(entityAttributesDetailDeleteErr, entityAttributesDetailDeleteRes) {
								// Handle Entity attributes detail error error
								if (entityAttributesDetailDeleteErr) done(entityAttributesDetailDeleteErr);

								// Set assertions
								(entityAttributesDetailDeleteRes.body._id).should.equal(entityAttributesDetailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Entity attributes detail instance if not signed in', function(done) {
		// Set Entity attributes detail user 
		entityAttributesDetail.user = user;

		// Create new Entity attributes detail model instance
		var entityAttributesDetailObj = new EntityAttributesDetail(entityAttributesDetail);

		// Save the Entity attributes detail
		entityAttributesDetailObj.save(function() {
			// Try deleting Entity attributes detail
			request(app).delete('/entity-attributes-details/' + entityAttributesDetailObj._id)
			.expect(401)
			.end(function(entityAttributesDetailDeleteErr, entityAttributesDetailDeleteRes) {
				// Set message assertion
				(entityAttributesDetailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Entity attributes detail error error
				done(entityAttributesDetailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EntityAttributesDetail.remove().exec();
		done();
	});
});