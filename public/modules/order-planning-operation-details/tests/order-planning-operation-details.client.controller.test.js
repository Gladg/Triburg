'use strict';

(function() {
	// Order planning operation details Controller Spec
	describe('Order planning operation details Controller Tests', function() {
		// Initialize global variables
		var OrderPlanningOperationDetailsController,
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

			// Initialize the Order planning operation details controller.
			OrderPlanningOperationDetailsController = $controller('OrderPlanningOperationDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order planning operation detail object fetched from XHR', inject(function(OrderPlanningOperationDetails) {
			// Create sample Order planning operation detail using the Order planning operation details service
			var sampleOrderPlanningOperationDetail = new OrderPlanningOperationDetails({
				name: 'New Order planning operation detail'
			});

			// Create a sample Order planning operation details array that includes the new Order planning operation detail
			var sampleOrderPlanningOperationDetails = [sampleOrderPlanningOperationDetail];

			// Set GET response
			$httpBackend.expectGET('order-planning-operation-details').respond(sampleOrderPlanningOperationDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderPlanningOperationDetails).toEqualData(sampleOrderPlanningOperationDetails);
		}));

		it('$scope.findOne() should create an array with one Order planning operation detail object fetched from XHR using a orderPlanningOperationDetailId URL parameter', inject(function(OrderPlanningOperationDetails) {
			// Define a sample Order planning operation detail object
			var sampleOrderPlanningOperationDetail = new OrderPlanningOperationDetails({
				name: 'New Order planning operation detail'
			});

			// Set the URL parameter
			$stateParams.orderPlanningOperationDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-planning-operation-details\/([0-9a-fA-F]{24})$/).respond(sampleOrderPlanningOperationDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderPlanningOperationDetail).toEqualData(sampleOrderPlanningOperationDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderPlanningOperationDetails) {
			// Create a sample Order planning operation detail object
			var sampleOrderPlanningOperationDetailPostData = new OrderPlanningOperationDetails({
				name: 'New Order planning operation detail'
			});

			// Create a sample Order planning operation detail response
			var sampleOrderPlanningOperationDetailResponse = new OrderPlanningOperationDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order planning operation detail'
			});

			// Fixture mock form input values
			scope.name = 'New Order planning operation detail';

			// Set POST response
			$httpBackend.expectPOST('order-planning-operation-details', sampleOrderPlanningOperationDetailPostData).respond(sampleOrderPlanningOperationDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order planning operation detail was created
			expect($location.path()).toBe('/order-planning-operation-details/' + sampleOrderPlanningOperationDetailResponse._id);
		}));

		it('$scope.update() should update a valid Order planning operation detail', inject(function(OrderPlanningOperationDetails) {
			// Define a sample Order planning operation detail put data
			var sampleOrderPlanningOperationDetailPutData = new OrderPlanningOperationDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order planning operation detail'
			});

			// Mock Order planning operation detail in scope
			scope.orderPlanningOperationDetail = sampleOrderPlanningOperationDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-planning-operation-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-planning-operation-details/' + sampleOrderPlanningOperationDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderPlanningOperationDetailId and remove the Order planning operation detail from the scope', inject(function(OrderPlanningOperationDetails) {
			// Create new Order planning operation detail object
			var sampleOrderPlanningOperationDetail = new OrderPlanningOperationDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order planning operation details array and include the Order planning operation detail
			scope.orderPlanningOperationDetails = [sampleOrderPlanningOperationDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-planning-operation-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderPlanningOperationDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderPlanningOperationDetails.length).toBe(0);
		}));
	});
}());