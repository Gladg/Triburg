'use strict';

(function() {
	// Yarn purchase orders Controller Spec
	describe('Yarn purchase orders Controller Tests', function() {
		// Initialize global variables
		var YarnPurchaseOrdersController,
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

			// Initialize the Yarn purchase orders controller.
			YarnPurchaseOrdersController = $controller('YarnPurchaseOrdersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Yarn purchase order object fetched from XHR', inject(function(YarnPurchaseOrders) {
			// Create sample Yarn purchase order using the Yarn purchase orders service
			var sampleYarnPurchaseOrder = new YarnPurchaseOrders({
				name: 'New Yarn purchase order'
			});

			// Create a sample Yarn purchase orders array that includes the new Yarn purchase order
			var sampleYarnPurchaseOrders = [sampleYarnPurchaseOrder];

			// Set GET response
			$httpBackend.expectGET('yarn-purchase-orders').respond(sampleYarnPurchaseOrders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnPurchaseOrders).toEqualData(sampleYarnPurchaseOrders);
		}));

		it('$scope.findOne() should create an array with one Yarn purchase order object fetched from XHR using a yarnPurchaseOrderId URL parameter', inject(function(YarnPurchaseOrders) {
			// Define a sample Yarn purchase order object
			var sampleYarnPurchaseOrder = new YarnPurchaseOrders({
				name: 'New Yarn purchase order'
			});

			// Set the URL parameter
			$stateParams.yarnPurchaseOrderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/yarn-purchase-orders\/([0-9a-fA-F]{24})$/).respond(sampleYarnPurchaseOrder);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.yarnPurchaseOrder).toEqualData(sampleYarnPurchaseOrder);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(YarnPurchaseOrders) {
			// Create a sample Yarn purchase order object
			var sampleYarnPurchaseOrderPostData = new YarnPurchaseOrders({
				name: 'New Yarn purchase order'
			});

			// Create a sample Yarn purchase order response
			var sampleYarnPurchaseOrderResponse = new YarnPurchaseOrders({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn purchase order'
			});

			// Fixture mock form input values
			scope.name = 'New Yarn purchase order';

			// Set POST response
			$httpBackend.expectPOST('yarn-purchase-orders', sampleYarnPurchaseOrderPostData).respond(sampleYarnPurchaseOrderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Yarn purchase order was created
			expect($location.path()).toBe('/yarn-purchase-orders/' + sampleYarnPurchaseOrderResponse._id);
		}));

		it('$scope.update() should update a valid Yarn purchase order', inject(function(YarnPurchaseOrders) {
			// Define a sample Yarn purchase order put data
			var sampleYarnPurchaseOrderPutData = new YarnPurchaseOrders({
				_id: '525cf20451979dea2c000001',
				name: 'New Yarn purchase order'
			});

			// Mock Yarn purchase order in scope
			scope.yarnPurchaseOrder = sampleYarnPurchaseOrderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/yarn-purchase-orders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/yarn-purchase-orders/' + sampleYarnPurchaseOrderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid yarnPurchaseOrderId and remove the Yarn purchase order from the scope', inject(function(YarnPurchaseOrders) {
			// Create new Yarn purchase order object
			var sampleYarnPurchaseOrder = new YarnPurchaseOrders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Yarn purchase orders array and include the Yarn purchase order
			scope.yarnPurchaseOrders = [sampleYarnPurchaseOrder];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/yarn-purchase-orders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleYarnPurchaseOrder);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.yarnPurchaseOrders.length).toBe(0);
		}));
	});
}());