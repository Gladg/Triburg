'use strict';

(function() {
	// Order registration measurement details Controller Spec
	describe('Order registration measurement details Controller Tests', function() {
		// Initialize global variables
		var OrderRegistrationMeasurementDetailsController,
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

			// Initialize the Order registration measurement details controller.
			OrderRegistrationMeasurementDetailsController = $controller('OrderRegistrationMeasurementDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order registration measurement detail object fetched from XHR', inject(function(OrderRegistrationMeasurementDetails) {
			// Create sample Order registration measurement detail using the Order registration measurement details service
			var sampleOrderRegistrationMeasurementDetail = new OrderRegistrationMeasurementDetails({
				name: 'New Order registration measurement detail'
			});

			// Create a sample Order registration measurement details array that includes the new Order registration measurement detail
			var sampleOrderRegistrationMeasurementDetails = [sampleOrderRegistrationMeasurementDetail];

			// Set GET response
			$httpBackend.expectGET('order-registration-measurement-details').respond(sampleOrderRegistrationMeasurementDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationMeasurementDetails).toEqualData(sampleOrderRegistrationMeasurementDetails);
		}));

		it('$scope.findOne() should create an array with one Order registration measurement detail object fetched from XHR using a orderRegistrationMeasurementDetailId URL parameter', inject(function(OrderRegistrationMeasurementDetails) {
			// Define a sample Order registration measurement detail object
			var sampleOrderRegistrationMeasurementDetail = new OrderRegistrationMeasurementDetails({
				name: 'New Order registration measurement detail'
			});

			// Set the URL parameter
			$stateParams.orderRegistrationMeasurementDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-registration-measurement-details\/([0-9a-fA-F]{24})$/).respond(sampleOrderRegistrationMeasurementDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationMeasurementDetail).toEqualData(sampleOrderRegistrationMeasurementDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderRegistrationMeasurementDetails) {
			// Create a sample Order registration measurement detail object
			var sampleOrderRegistrationMeasurementDetailPostData = new OrderRegistrationMeasurementDetails({
				name: 'New Order registration measurement detail'
			});

			// Create a sample Order registration measurement detail response
			var sampleOrderRegistrationMeasurementDetailResponse = new OrderRegistrationMeasurementDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration measurement detail'
			});

			// Fixture mock form input values
			scope.name = 'New Order registration measurement detail';

			// Set POST response
			$httpBackend.expectPOST('order-registration-measurement-details', sampleOrderRegistrationMeasurementDetailPostData).respond(sampleOrderRegistrationMeasurementDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order registration measurement detail was created
			expect($location.path()).toBe('/order-registration-measurement-details/' + sampleOrderRegistrationMeasurementDetailResponse._id);
		}));

		it('$scope.update() should update a valid Order registration measurement detail', inject(function(OrderRegistrationMeasurementDetails) {
			// Define a sample Order registration measurement detail put data
			var sampleOrderRegistrationMeasurementDetailPutData = new OrderRegistrationMeasurementDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration measurement detail'
			});

			// Mock Order registration measurement detail in scope
			scope.orderRegistrationMeasurementDetail = sampleOrderRegistrationMeasurementDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-registration-measurement-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-registration-measurement-details/' + sampleOrderRegistrationMeasurementDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderRegistrationMeasurementDetailId and remove the Order registration measurement detail from the scope', inject(function(OrderRegistrationMeasurementDetails) {
			// Create new Order registration measurement detail object
			var sampleOrderRegistrationMeasurementDetail = new OrderRegistrationMeasurementDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order registration measurement details array and include the Order registration measurement detail
			scope.orderRegistrationMeasurementDetails = [sampleOrderRegistrationMeasurementDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-registration-measurement-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderRegistrationMeasurementDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderRegistrationMeasurementDetails.length).toBe(0);
		}));
	});
}());