'use strict';

(function() {
	// Accessories purchase orders Controller Spec
	describe('Accessories purchase orders Controller Tests', function() {
		// Initialize global variables
		var AccessoriesPurchaseOrdersController,
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

			// Initialize the Accessories purchase orders controller.
			AccessoriesPurchaseOrdersController = $controller('AccessoriesPurchaseOrdersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Accessories purchase order object fetched from XHR', inject(function(AccessoriesPurchaseOrders) {
			// Create sample Accessories purchase order using the Accessories purchase orders service
			var sampleAccessoriesPurchaseOrder = new AccessoriesPurchaseOrders({
				name: 'New Accessories purchase order'
			});

			// Create a sample Accessories purchase orders array that includes the new Accessories purchase order
			var sampleAccessoriesPurchaseOrders = [sampleAccessoriesPurchaseOrder];

			// Set GET response
			$httpBackend.expectGET('accessories-purchase-orders').respond(sampleAccessoriesPurchaseOrders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.accessoriesPurchaseOrders).toEqualData(sampleAccessoriesPurchaseOrders);
		}));

		it('$scope.findOne() should create an array with one Accessories purchase order object fetched from XHR using a accessoriesPurchaseOrderId URL parameter', inject(function(AccessoriesPurchaseOrders) {
			// Define a sample Accessories purchase order object
			var sampleAccessoriesPurchaseOrder = new AccessoriesPurchaseOrders({
				name: 'New Accessories purchase order'
			});

			// Set the URL parameter
			$stateParams.accessoriesPurchaseOrderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/accessories-purchase-orders\/([0-9a-fA-F]{24})$/).respond(sampleAccessoriesPurchaseOrder);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.accessoriesPurchaseOrder).toEqualData(sampleAccessoriesPurchaseOrder);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(AccessoriesPurchaseOrders) {
			// Create a sample Accessories purchase order object
			var sampleAccessoriesPurchaseOrderPostData = new AccessoriesPurchaseOrders({
				name: 'New Accessories purchase order'
			});

			// Create a sample Accessories purchase order response
			var sampleAccessoriesPurchaseOrderResponse = new AccessoriesPurchaseOrders({
				_id: '525cf20451979dea2c000001',
				name: 'New Accessories purchase order'
			});

			// Fixture mock form input values
			scope.name = 'New Accessories purchase order';

			// Set POST response
			$httpBackend.expectPOST('accessories-purchase-orders', sampleAccessoriesPurchaseOrderPostData).respond(sampleAccessoriesPurchaseOrderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Accessories purchase order was created
			expect($location.path()).toBe('/accessories-purchase-orders/' + sampleAccessoriesPurchaseOrderResponse._id);
		}));

		it('$scope.update() should update a valid Accessories purchase order', inject(function(AccessoriesPurchaseOrders) {
			// Define a sample Accessories purchase order put data
			var sampleAccessoriesPurchaseOrderPutData = new AccessoriesPurchaseOrders({
				_id: '525cf20451979dea2c000001',
				name: 'New Accessories purchase order'
			});

			// Mock Accessories purchase order in scope
			scope.accessoriesPurchaseOrder = sampleAccessoriesPurchaseOrderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/accessories-purchase-orders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/accessories-purchase-orders/' + sampleAccessoriesPurchaseOrderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid accessoriesPurchaseOrderId and remove the Accessories purchase order from the scope', inject(function(AccessoriesPurchaseOrders) {
			// Create new Accessories purchase order object
			var sampleAccessoriesPurchaseOrder = new AccessoriesPurchaseOrders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Accessories purchase orders array and include the Accessories purchase order
			scope.accessoriesPurchaseOrders = [sampleAccessoriesPurchaseOrder];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/accessories-purchase-orders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAccessoriesPurchaseOrder);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.accessoriesPurchaseOrders.length).toBe(0);
		}));
	});
}());