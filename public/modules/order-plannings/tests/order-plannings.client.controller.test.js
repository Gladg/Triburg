'use strict';

(function() {
	// Order plannings Controller Spec
	describe('Order plannings Controller Tests', function() {
		// Initialize global variables
		var OrderPlanningsController,
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

			// Initialize the Order plannings controller.
			OrderPlanningsController = $controller('OrderPlanningsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order planning object fetched from XHR', inject(function(OrderPlannings) {
			// Create sample Order planning using the Order plannings service
			var sampleOrderPlanning = new OrderPlannings({
				name: 'New Order planning'
			});

			// Create a sample Order plannings array that includes the new Order planning
			var sampleOrderPlannings = [sampleOrderPlanning];

			// Set GET response
			$httpBackend.expectGET('order-plannings').respond(sampleOrderPlannings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderPlannings).toEqualData(sampleOrderPlannings);
		}));

		it('$scope.findOne() should create an array with one Order planning object fetched from XHR using a orderPlanningId URL parameter', inject(function(OrderPlannings) {
			// Define a sample Order planning object
			var sampleOrderPlanning = new OrderPlannings({
				name: 'New Order planning'
			});

			// Set the URL parameter
			$stateParams.orderPlanningId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-plannings\/([0-9a-fA-F]{24})$/).respond(sampleOrderPlanning);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderPlanning).toEqualData(sampleOrderPlanning);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderPlannings) {
			// Create a sample Order planning object
			var sampleOrderPlanningPostData = new OrderPlannings({
				name: 'New Order planning'
			});

			// Create a sample Order planning response
			var sampleOrderPlanningResponse = new OrderPlannings({
				_id: '525cf20451979dea2c000001',
				name: 'New Order planning'
			});

			// Fixture mock form input values
			scope.name = 'New Order planning';

			// Set POST response
			$httpBackend.expectPOST('order-plannings', sampleOrderPlanningPostData).respond(sampleOrderPlanningResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order planning was created
			expect($location.path()).toBe('/order-plannings/' + sampleOrderPlanningResponse._id);
		}));

		it('$scope.update() should update a valid Order planning', inject(function(OrderPlannings) {
			// Define a sample Order planning put data
			var sampleOrderPlanningPutData = new OrderPlannings({
				_id: '525cf20451979dea2c000001',
				name: 'New Order planning'
			});

			// Mock Order planning in scope
			scope.orderPlanning = sampleOrderPlanningPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-plannings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-plannings/' + sampleOrderPlanningPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderPlanningId and remove the Order planning from the scope', inject(function(OrderPlannings) {
			// Create new Order planning object
			var sampleOrderPlanning = new OrderPlannings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order plannings array and include the Order planning
			scope.orderPlannings = [sampleOrderPlanning];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-plannings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderPlanning);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderPlannings.length).toBe(0);
		}));
	});
}());