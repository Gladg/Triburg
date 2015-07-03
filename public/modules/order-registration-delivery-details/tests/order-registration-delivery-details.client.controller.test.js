'use strict';

(function() {
	// Order registration delivery details Controller Spec
	describe('Order registration delivery details Controller Tests', function() {
		// Initialize global variables
		var OrderRegistrationDeliveryDetailsController,
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

			// Initialize the Order registration delivery details controller.
			OrderRegistrationDeliveryDetailsController = $controller('OrderRegistrationDeliveryDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order registration delivery detail object fetched from XHR', inject(function(OrderRegistrationDeliveryDetails) {
			// Create sample Order registration delivery detail using the Order registration delivery details service
			var sampleOrderRegistrationDeliveryDetail = new OrderRegistrationDeliveryDetails({
				name: 'New Order registration delivery detail'
			});

			// Create a sample Order registration delivery details array that includes the new Order registration delivery detail
			var sampleOrderRegistrationDeliveryDetails = [sampleOrderRegistrationDeliveryDetail];

			// Set GET response
			$httpBackend.expectGET('order-registration-delivery-details').respond(sampleOrderRegistrationDeliveryDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationDeliveryDetails).toEqualData(sampleOrderRegistrationDeliveryDetails);
		}));

		it('$scope.findOne() should create an array with one Order registration delivery detail object fetched from XHR using a orderRegistrationDeliveryDetailId URL parameter', inject(function(OrderRegistrationDeliveryDetails) {
			// Define a sample Order registration delivery detail object
			var sampleOrderRegistrationDeliveryDetail = new OrderRegistrationDeliveryDetails({
				name: 'New Order registration delivery detail'
			});

			// Set the URL parameter
			$stateParams.orderRegistrationDeliveryDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-registration-delivery-details\/([0-9a-fA-F]{24})$/).respond(sampleOrderRegistrationDeliveryDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationDeliveryDetail).toEqualData(sampleOrderRegistrationDeliveryDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderRegistrationDeliveryDetails) {
			// Create a sample Order registration delivery detail object
			var sampleOrderRegistrationDeliveryDetailPostData = new OrderRegistrationDeliveryDetails({
				name: 'New Order registration delivery detail'
			});

			// Create a sample Order registration delivery detail response
			var sampleOrderRegistrationDeliveryDetailResponse = new OrderRegistrationDeliveryDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration delivery detail'
			});

			// Fixture mock form input values
			scope.name = 'New Order registration delivery detail';

			// Set POST response
			$httpBackend.expectPOST('order-registration-delivery-details', sampleOrderRegistrationDeliveryDetailPostData).respond(sampleOrderRegistrationDeliveryDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order registration delivery detail was created
			expect($location.path()).toBe('/order-registration-delivery-details/' + sampleOrderRegistrationDeliveryDetailResponse._id);
		}));

		it('$scope.update() should update a valid Order registration delivery detail', inject(function(OrderRegistrationDeliveryDetails) {
			// Define a sample Order registration delivery detail put data
			var sampleOrderRegistrationDeliveryDetailPutData = new OrderRegistrationDeliveryDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration delivery detail'
			});

			// Mock Order registration delivery detail in scope
			scope.orderRegistrationDeliveryDetail = sampleOrderRegistrationDeliveryDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-registration-delivery-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-registration-delivery-details/' + sampleOrderRegistrationDeliveryDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderRegistrationDeliveryDetailId and remove the Order registration delivery detail from the scope', inject(function(OrderRegistrationDeliveryDetails) {
			// Create new Order registration delivery detail object
			var sampleOrderRegistrationDeliveryDetail = new OrderRegistrationDeliveryDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order registration delivery details array and include the Order registration delivery detail
			scope.orderRegistrationDeliveryDetails = [sampleOrderRegistrationDeliveryDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-registration-delivery-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderRegistrationDeliveryDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderRegistrationDeliveryDetails.length).toBe(0);
		}));
	});
}());