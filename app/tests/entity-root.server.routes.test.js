'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EntityRoot = mongoose.model('EntityRoot'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, entityRoot;

/**
 * Entity root routes tests
 */
describe('Entity root CRUD tests', function() {
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

		// Save a user to the test db and create new Entity root
		user.save(function() {
			entityRoot = {
				name: 'Entity root Name'
			};

			done();
		});
	});

	it('should be able to save Entity root instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity root
				agent.post('/entity-roots')
					.send(entityRoot)
					.expect(200)
					.end(function(entityRootSaveErr, entityRootSaveRes) {
						// Handle Entity root save error
						if (entityRootSaveErr) done(entityRootSaveErr);

						// Get a list of Entity roots
						agent.get('/entity-roots')
							.end(function(entityRootsGetErr, entityRootsGetRes) {
								// Handle Entity root save error
								if (entityRootsGetErr) done(entityRootsGetErr);

								// Get Entity roots list
								var entityRoots = entityRootsGetRes.body;

								// Set assertions
								(entityRoots[0].user._id).should.equal(userId);
								(entityRoots[0].name).should.match('Entity root Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Entity root instance if not logged in', function(done) {
		agent.post('/entity-roots')
			.send(entityRoot)
			.expect(401)
			.end(function(entityRootSaveErr, entityRootSaveRes) {
				// Call the assertion callback
				done(entityRootSaveErr);
			});
	});

	it('should not be able to save Entity root instance if no name is provided', function(done) {
		// Invalidate name field
		entityRoot.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity root
				agent.post('/entity-roots')
					.send(entityRoot)
					.expect(400)
					.end(function(entityRootSaveErr, entityRootSaveRes) {
						// Set message assertion
						(entityRootSaveRes.body.message).should.match('Please fill Entity root name');
						
						// Handle Entity root save error
						done(entityRootSaveErr);
					});
			});
	});

	it('should be able to update Entity root instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity root
				agent.post('/entity-roots')
					.send(entityRoot)
					.expect(200)
					.end(function(entityRootSaveErr, entityRootSaveRes) {
						// Handle Entity root save error
						if (entityRootSaveErr) done(entityRootSaveErr);

						// Update Entity root name
						entityRoot.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Entity root
						agent.put('/entity-roots/' + entityRootSaveRes.body._id)
							.send(entityRoot)
							.expect(200)
							.end(function(entityRootUpdateErr, entityRootUpdateRes) {
								// Handle Entity root update error
								if (entityRootUpdateErr) done(entityRootUpdateErr);

								// Set assertions
								(entityRootUpdateRes.body._id).should.equal(entityRootSaveRes.body._id);
								(entityRootUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Entity roots if not signed in', function(done) {
		// Create new Entity root model instance
		var entityRootObj = new EntityRoot(entityRoot);

		// Save the Entity root
		entityRootObj.save(function() {
			// Request Entity roots
			request(app).get('/entity-roots')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Entity root if not signed in', function(done) {
		// Create new Entity root model instance
		var entityRootObj = new EntityRoot(entityRoot);

		// Save the Entity root
		entityRootObj.save(function() {
			request(app).get('/entity-roots/' + entityRootObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', entityRoot.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Entity root instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Entity root
				agent.post('/entity-roots')
					.send(entityRoot)
					.expect(200)
					.end(function(entityRootSaveErr, entityRootSaveRes) {
						// Handle Entity root save error
						if (entityRootSaveErr) done(entityRootSaveErr);

						// Delete existing Entity root
						agent.delete('/entity-roots/' + entityRootSaveRes.body._id)
							.send(entityRoot)
							.expect(200)
							.end(function(entityRootDeleteErr, entityRootDeleteRes) {
								// Handle Entity root error error
								if (entityRootDeleteErr) done(entityRootDeleteErr);

								// Set assertions
								(entityRootDeleteRes.body._id).should.equal(entityRootSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Entity root instance if not signed in', function(done) {
		// Set Entity root user 
		entityRoot.user = user;

		// Create new Entity root model instance
		var entityRootObj = new EntityRoot(entityRoot);

		// Save the Entity root
		entityRootObj.save(function() {
			// Try deleting Entity root
			request(app).delete('/entity-roots/' + entityRootObj._id)
			.expect(401)
			.end(function(entityRootDeleteErr, entityRootDeleteRes) {
				// Set message assertion
				(entityRootDeleteRes.body.message).should.match('User is not logged in');

				// Handle Entity root error error
				done(entityRootDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EntityRoot.remove().exec();
		done();
	});
});