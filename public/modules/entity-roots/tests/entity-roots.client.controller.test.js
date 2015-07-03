'use strict';

(function() {
	// Entity roots Controller Spec
	describe('Entity roots Controller Tests', function() {
		// Initialize global variables
		var EntityRootsController,
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

			// Initialize the Entity roots controller.
			EntityRootsController = $controller('EntityRootsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Entity root object fetched from XHR', inject(function(EntityRoots) {
			// Create sample Entity root using the Entity roots service
			var sampleEntityRoot = new EntityRoots({
				name: 'New Entity root'
			});

			// Create a sample Entity roots array that includes the new Entity root
			var sampleEntityRoots = [sampleEntityRoot];

			// Set GET response
			$httpBackend.expectGET('entity-roots').respond(sampleEntityRoots);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityRoots).toEqualData(sampleEntityRoots);
		}));

		it('$scope.findOne() should create an array with one Entity root object fetched from XHR using a entityRootId URL parameter', inject(function(EntityRoots) {
			// Define a sample Entity root object
			var sampleEntityRoot = new EntityRoots({
				name: 'New Entity root'
			});

			// Set the URL parameter
			$stateParams.entityRootId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/entity-roots\/([0-9a-fA-F]{24})$/).respond(sampleEntityRoot);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entityRoot).toEqualData(sampleEntityRoot);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(EntityRoots) {
			// Create a sample Entity root object
			var sampleEntityRootPostData = new EntityRoots({
				name: 'New Entity root'
			});

			// Create a sample Entity root response
			var sampleEntityRootResponse = new EntityRoots({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity root'
			});

			// Fixture mock form input values
			scope.name = 'New Entity root';

			// Set POST response
			$httpBackend.expectPOST('entity-roots', sampleEntityRootPostData).respond(sampleEntityRootResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Entity root was created
			expect($location.path()).toBe('/entity-roots/' + sampleEntityRootResponse._id);
		}));

		it('$scope.update() should update a valid Entity root', inject(function(EntityRoots) {
			// Define a sample Entity root put data
			var sampleEntityRootPutData = new EntityRoots({
				_id: '525cf20451979dea2c000001',
				name: 'New Entity root'
			});

			// Mock Entity root in scope
			scope.entityRoot = sampleEntityRootPutData;

			// Set PUT response
			$httpBackend.expectPUT(/entity-roots\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/entity-roots/' + sampleEntityRootPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid entityRootId and remove the Entity root from the scope', inject(function(EntityRoots) {
			// Create new Entity root object
			var sampleEntityRoot = new EntityRoots({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Entity roots array and include the Entity root
			scope.entityRoots = [sampleEntityRoot];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/entity-roots\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEntityRoot);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.entityRoots.length).toBe(0);
		}));
	});
}());