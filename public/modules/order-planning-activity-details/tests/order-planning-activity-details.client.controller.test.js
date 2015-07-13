'use strict';

(function() {
	// Order planning activity details Controller Spec
	describe('Order planning activity details Controller Tests', function() {
		// Initialize global variables
		var OrderPlanningActivityDetailsController,
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

			// Initialize the Order planning activity details controller.
			OrderPlanningActivityDetailsController = $controller('OrderPlanningActivityDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order planning activity detail object fetched from XHR', inject(function(OrderPlanningActivityDetails) {
			// Create sample Order planning activity detail using the Order planning activity details service
			var sampleOrderPlanningActivityDetail = new OrderPlanningActivityDetails({
				name: 'New Order planning activity detail'
			});

			// Create a sample Order planning activity details array that includes the new Order planning activity detail
			var sampleOrderPlanningActivityDetails = [sampleOrderPlanningActivityDetail];

			// Set GET response
			$httpBackend.expectGET('order-planning-activity-details').respond(sampleOrderPlanningActivityDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderPlanningActivityDetails).toEqualData(sampleOrderPlanningActivityDetails);
		}));

		it('$scope.findOne() should create an array with one Order planning activity detail object fetched from XHR using a orderPlanningActivityDetailId URL parameter', inject(function(OrderPlanningActivityDetails) {
			// Define a sample Order planning activity detail object
			var sampleOrderPlanningActivityDetail = new OrderPlanningActivityDetails({
				name: 'New Order planning activity detail'
			});

			// Set the URL parameter
			$stateParams.orderPlanningActivityDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-planning-activity-details\/([0-9a-fA-F]{24})$/).respond(sampleOrderPlanningActivityDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderPlanningActivityDetail).toEqualData(sampleOrderPlanningActivityDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderPlanningActivityDetails) {
			// Create a sample Order planning activity detail object
			var sampleOrderPlanningActivityDetailPostData = new OrderPlanningActivityDetails({
				name: 'New Order planning activity detail'
			});

			// Create a sample Order planning activity detail response
			var sampleOrderPlanningActivityDetailResponse = new OrderPlanningActivityDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order planning activity detail'
			});

			// Fixture mock form input values
			scope.name = 'New Order planning activity detail';

			// Set POST response
			$httpBackend.expectPOST('order-planning-activity-details', sampleOrderPlanningActivityDetailPostData).respond(sampleOrderPlanningActivityDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order planning activity detail was created
			expect($location.path()).toBe('/order-planning-activity-details/' + sampleOrderPlanningActivityDetailResponse._id);
		}));

		it('$scope.update() should update a valid Order planning activity detail', inject(function(OrderPlanningActivityDetails) {
			// Define a sample Order planning activity detail put data
			var sampleOrderPlanningActivityDetailPutData = new OrderPlanningActivityDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order planning activity detail'
			});

			// Mock Order planning activity detail in scope
			scope.orderPlanningActivityDetail = sampleOrderPlanningActivityDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-planning-activity-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-planning-activity-details/' + sampleOrderPlanningActivityDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderPlanningActivityDetailId and remove the Order planning activity detail from the scope', inject(function(OrderPlanningActivityDetails) {
			// Create new Order planning activity detail object
			var sampleOrderPlanningActivityDetail = new OrderPlanningActivityDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order planning activity details array and include the Order planning activity detail
			scope.orderPlanningActivityDetails = [sampleOrderPlanningActivityDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-planning-activity-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderPlanningActivityDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderPlanningActivityDetails.length).toBe(0);
		}));
	});
}());