'use strict';

(function() {
	// Order registration roots Controller Spec
	describe('Order registration roots Controller Tests', function() {
		// Initialize global variables
		var OrderRegistrationRootsController,
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

			// Initialize the Order registration roots controller.
			OrderRegistrationRootsController = $controller('OrderRegistrationRootsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order registration root object fetched from XHR', inject(function(OrderRegistrationRoots) {
			// Create sample Order registration root using the Order registration roots service
			var sampleOrderRegistrationRoot = new OrderRegistrationRoots({
				name: 'New Order registration root'
			});

			// Create a sample Order registration roots array that includes the new Order registration root
			var sampleOrderRegistrationRoots = [sampleOrderRegistrationRoot];

			// Set GET response
			$httpBackend.expectGET('order-registration-roots').respond(sampleOrderRegistrationRoots);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationRoots).toEqualData(sampleOrderRegistrationRoots);
		}));

		it('$scope.findOne() should create an array with one Order registration root object fetched from XHR using a orderRegistrationRootId URL parameter', inject(function(OrderRegistrationRoots) {
			// Define a sample Order registration root object
			var sampleOrderRegistrationRoot = new OrderRegistrationRoots({
				name: 'New Order registration root'
			});

			// Set the URL parameter
			$stateParams.orderRegistrationRootId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-registration-roots\/([0-9a-fA-F]{24})$/).respond(sampleOrderRegistrationRoot);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationRoot).toEqualData(sampleOrderRegistrationRoot);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderRegistrationRoots) {
			// Create a sample Order registration root object
			var sampleOrderRegistrationRootPostData = new OrderRegistrationRoots({
				name: 'New Order registration root'
			});

			// Create a sample Order registration root response
			var sampleOrderRegistrationRootResponse = new OrderRegistrationRoots({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration root'
			});

			// Fixture mock form input values
			scope.name = 'New Order registration root';

			// Set POST response
			$httpBackend.expectPOST('order-registration-roots', sampleOrderRegistrationRootPostData).respond(sampleOrderRegistrationRootResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order registration root was created
			expect($location.path()).toBe('/order-registration-roots/' + sampleOrderRegistrationRootResponse._id);
		}));

		it('$scope.update() should update a valid Order registration root', inject(function(OrderRegistrationRoots) {
			// Define a sample Order registration root put data
			var sampleOrderRegistrationRootPutData = new OrderRegistrationRoots({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration root'
			});

			// Mock Order registration root in scope
			scope.orderRegistrationRoot = sampleOrderRegistrationRootPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-registration-roots\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-registration-roots/' + sampleOrderRegistrationRootPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderRegistrationRootId and remove the Order registration root from the scope', inject(function(OrderRegistrationRoots) {
			// Create new Order registration root object
			var sampleOrderRegistrationRoot = new OrderRegistrationRoots({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order registration roots array and include the Order registration root
			scope.orderRegistrationRoots = [sampleOrderRegistrationRoot];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-registration-roots\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderRegistrationRoot);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderRegistrationRoots.length).toBe(0);
		}));
	});
}());