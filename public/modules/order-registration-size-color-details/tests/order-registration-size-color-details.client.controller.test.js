'use strict';

(function() {
	// Order registration size color details Controller Spec
	describe('Order registration size color details Controller Tests', function() {
		// Initialize global variables
		var OrderRegistrationSizeColorDetailsController,
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

			// Initialize the Order registration size color details controller.
			OrderRegistrationSizeColorDetailsController = $controller('OrderRegistrationSizeColorDetailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order registration size color detail object fetched from XHR', inject(function(OrderRegistrationSizeColorDetails) {
			// Create sample Order registration size color detail using the Order registration size color details service
			var sampleOrderRegistrationSizeColorDetail = new OrderRegistrationSizeColorDetails({
				name: 'New Order registration size color detail'
			});

			// Create a sample Order registration size color details array that includes the new Order registration size color detail
			var sampleOrderRegistrationSizeColorDetails = [sampleOrderRegistrationSizeColorDetail];

			// Set GET response
			$httpBackend.expectGET('order-registration-size-color-details').respond(sampleOrderRegistrationSizeColorDetails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationSizeColorDetails).toEqualData(sampleOrderRegistrationSizeColorDetails);
		}));

		it('$scope.findOne() should create an array with one Order registration size color detail object fetched from XHR using a orderRegistrationSizeColorDetailId URL parameter', inject(function(OrderRegistrationSizeColorDetails) {
			// Define a sample Order registration size color detail object
			var sampleOrderRegistrationSizeColorDetail = new OrderRegistrationSizeColorDetails({
				name: 'New Order registration size color detail'
			});

			// Set the URL parameter
			$stateParams.orderRegistrationSizeColorDetailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-registration-size-color-details\/([0-9a-fA-F]{24})$/).respond(sampleOrderRegistrationSizeColorDetail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderRegistrationSizeColorDetail).toEqualData(sampleOrderRegistrationSizeColorDetail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderRegistrationSizeColorDetails) {
			// Create a sample Order registration size color detail object
			var sampleOrderRegistrationSizeColorDetailPostData = new OrderRegistrationSizeColorDetails({
				name: 'New Order registration size color detail'
			});

			// Create a sample Order registration size color detail response
			var sampleOrderRegistrationSizeColorDetailResponse = new OrderRegistrationSizeColorDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration size color detail'
			});

			// Fixture mock form input values
			scope.name = 'New Order registration size color detail';

			// Set POST response
			$httpBackend.expectPOST('order-registration-size-color-details', sampleOrderRegistrationSizeColorDetailPostData).respond(sampleOrderRegistrationSizeColorDetailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order registration size color detail was created
			expect($location.path()).toBe('/order-registration-size-color-details/' + sampleOrderRegistrationSizeColorDetailResponse._id);
		}));

		it('$scope.update() should update a valid Order registration size color detail', inject(function(OrderRegistrationSizeColorDetails) {
			// Define a sample Order registration size color detail put data
			var sampleOrderRegistrationSizeColorDetailPutData = new OrderRegistrationSizeColorDetails({
				_id: '525cf20451979dea2c000001',
				name: 'New Order registration size color detail'
			});

			// Mock Order registration size color detail in scope
			scope.orderRegistrationSizeColorDetail = sampleOrderRegistrationSizeColorDetailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-registration-size-color-details\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-registration-size-color-details/' + sampleOrderRegistrationSizeColorDetailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderRegistrationSizeColorDetailId and remove the Order registration size color detail from the scope', inject(function(OrderRegistrationSizeColorDetails) {
			// Create new Order registration size color detail object
			var sampleOrderRegistrationSizeColorDetail = new OrderRegistrationSizeColorDetails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order registration size color details array and include the Order registration size color detail
			scope.orderRegistrationSizeColorDetails = [sampleOrderRegistrationSizeColorDetail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-registration-size-color-details\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderRegistrationSizeColorDetail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderRegistrationSizeColorDetails.length).toBe(0);
		}));
	});
}());