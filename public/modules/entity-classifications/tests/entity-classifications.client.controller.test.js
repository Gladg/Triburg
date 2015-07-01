'use strict';

(function() {
	// Entity classifications Controller Spec
	describe('Entity classifications Controller Tests', function() {
		// Initialize global variables
		var EntityClassificationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Entity classifications controller.
			EntityClassificationsController = $controller('EntityClassificationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Entity classification object fetched from XHR', inject(function(EntityClassifications) {
			// Create sample Entity classification using the Entity classifications service
			var sampleEntityClassification = new EntityClassifications({
				name: 'New Entity classification'
			});

			// Create a sample Entity classifications array that includes the new Entity classification
			var sampleEntityClassifications = [sampleEntityClassification];

			// Set GET response
			$httpBackend.expectGET('entity-classifications').respond(sampleEntityClassifications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityClassifications).toEqualData(sampleEntityClassifications);
		}));

		it('$scope.findOne() should create an array with one Entity classification object fetched from XHR using a entityClassificationId URL parameter', inject(function(EntityClassifications) {
			// Define a sample Entity classification object
			var sampleEntityClassification = new EntityClassifications({
				name: 'New Entity classification'
			});

			// Set the URL parameter
			$stateParams.entityClassificationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/entity-classifications\/([0-9a-fA-F]{24})$/).respond(sampleEntityClassification);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityClassification).toEqualData(sampleEntityClassification);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EntityClassifications) {
			// Create a sample Entity classification object
			var sampleEntityClassificationPostData = new EntityClassifications({
				name: 'New Entity classification'
			});

			// Create a sample Entity classification response
			var sampleEntityClassificationResponse = new EntityClassifications({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity classification'
			});

			// Fixture mock form input values
			scope.name = 'New Entity classification';

			// Set POST response
			$httpBackend.expectPOST('entity-classifications', sampleEntityClassificationPostData).respond(sampleEntityClassificationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Entity classification was created
			expect($location.path()).toBe('/entity-classifications/' + sampleEntityClassificationResponse._id);
		}));

		it('$scope.update() should update a valid Entity classification', inject(function(EntityClassifications) {
			// Define a sample Entity classification put data
			var sampleEntityClassificationPutData = new EntityClassifications({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity classification'
			});

			// Mock Entity classification in scope
			scope.entityClassification = sampleEntityClassificationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/entity-classifications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/entity-classifications/' + sampleEntityClassificationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid entityClassificationId and remove the Entity classification from the scope', inject(function(EntityClassifications) {
			// Create new Entity classification object
			var sampleEntityClassification = new EntityClassifications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Entity classifications array and include the Entity classification
			scope.entityClassifications = [sampleEntityClassification];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/entity-classifications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEntityClassification);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.entityClassifications.length).toBe(0);
		}));
	});
}());