'use strict';

(function() {
	// Delivery challans Controller Spec
	describe('Delivery challans Controller Tests', function() {
		// Initialize global variables
		var DeliveryChallansController,
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

			// Initialize the Delivery challans controller.
			DeliveryChallansController = $controller('DeliveryChallansController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Delivery challan object fetched from XHR', inject(function(DeliveryChallans) {
			// Create sample Delivery challan using the Delivery challans service
			var sampleDeliveryChallan = new DeliveryChallans({
				name: 'New Delivery challan'
			});

			// Create a sample Delivery challans array that includes the new Delivery challan
			var sampleDeliveryChallans = [sampleDeliveryChallan];

			// Set GET response
			$httpBackend.expectGET('delivery-challans').respond(sampleDeliveryChallans);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.deliveryChallans).toEqualData(sampleDeliveryChallans);
		}));

		it('$scope.findOne() should create an array with one Delivery challan object fetched from XHR using a deliveryChallanId URL parameter', inject(function(DeliveryChallans) {
			// Define a sample Delivery challan object
			var sampleDeliveryChallan = new DeliveryChallans({
				name: 'New Delivery challan'
			});

			// Set the URL parameter
			$stateParams.deliveryChallanId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/delivery-challans\/([0-9a-fA-F]{24})$/).respond(sampleDeliveryChallan);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.deliveryChallan).toEqualData(sampleDeliveryChallan);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(DeliveryChallans) {
			// Create a sample Delivery challan object
			var sampleDeliveryChallanPostData = new DeliveryChallans({
				name: 'New Delivery challan'
			});

			// Create a sample Delivery challan response
			var sampleDeliveryChallanResponse = new DeliveryChallans({
				_id: '525cf20451979dea2c000001',
				name: 'New Delivery challan'
			});

			// Fixture mock form input values
			scope.name = 'New Delivery challan';

			// Set POST response
			$httpBackend.expectPOST('delivery-challans', sampleDeliveryChallanPostData).respond(sampleDeliveryChallanResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Delivery challan was created
			expect($location.path()).toBe('/delivery-challans/' + sampleDeliveryChallanResponse._id);
		}));

		it('$scope.update() should update a valid Delivery challan', inject(function(DeliveryChallans) {
			// Define a sample Delivery challan put data
			var sampleDeliveryChallanPutData = new DeliveryChallans({
				_id: '525cf20451979dea2c000001',
				name: 'New Delivery challan'
			});

			// Mock Delivery challan in scope
			scope.deliveryChallan = sampleDeliveryChallanPutData;

			// Set PUT response
			$httpBackend.expectPUT(/delivery-challans\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/delivery-challans/' + sampleDeliveryChallanPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid deliveryChallanId and remove the Delivery challan from the scope', inject(function(DeliveryChallans) {
			// Create new Delivery challan object
			var sampleDeliveryChallan = new DeliveryChallans({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Delivery challans array and include the Delivery challan
			scope.deliveryChallans = [sampleDeliveryChallan];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/delivery-challans\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDeliveryChallan);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.deliveryChallans.length).toBe(0);
		}));
	});
}());