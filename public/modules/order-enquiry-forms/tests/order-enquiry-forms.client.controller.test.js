'use strict';

(function() {
	// Order enquiry forms Controller Spec
	describe('Order enquiry forms Controller Tests', function() {
		// Initialize global variables
		var OrderEnquiryFormsController,
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

			// Initialize the Order enquiry forms controller.
			OrderEnquiryFormsController = $controller('OrderEnquiryFormsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Order enquiry form object fetched from XHR', inject(function(OrderEnquiryForms) {
			// Create sample Order enquiry form using the Order enquiry forms service
			var sampleOrderEnquiryForm = new OrderEnquiryForms({
				name: 'New Order enquiry form'
			});

			// Create a sample Order enquiry forms array that includes the new Order enquiry form
			var sampleOrderEnquiryForms = [sampleOrderEnquiryForm];

			// Set GET response
			$httpBackend.expectGET('order-enquiry-forms').respond(sampleOrderEnquiryForms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderEnquiryForms).toEqualData(sampleOrderEnquiryForms);
		}));

		it('$scope.findOne() should create an array with one Order enquiry form object fetched from XHR using a orderEnquiryFormId URL parameter', inject(function(OrderEnquiryForms) {
			// Define a sample Order enquiry form object
			var sampleOrderEnquiryForm = new OrderEnquiryForms({
				name: 'New Order enquiry form'
			});

			// Set the URL parameter
			$stateParams.orderEnquiryFormId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/order-enquiry-forms\/([0-9a-fA-F]{24})$/).respond(sampleOrderEnquiryForm);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orderEnquiryForm).toEqualData(sampleOrderEnquiryForm);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(OrderEnquiryForms) {
			// Create a sample Order enquiry form object
			var sampleOrderEnquiryFormPostData = new OrderEnquiryForms({
				name: 'New Order enquiry form'
			});

			// Create a sample Order enquiry form response
			var sampleOrderEnquiryFormResponse = new OrderEnquiryForms({
				_id: '525cf20451979dea2c000001',
				name: 'New Order enquiry form'
			});

			// Fixture mock form input values
			scope.name = 'New Order enquiry form';

			// Set POST response
			$httpBackend.expectPOST('order-enquiry-forms', sampleOrderEnquiryFormPostData).respond(sampleOrderEnquiryFormResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Order enquiry form was created
			expect($location.path()).toBe('/order-enquiry-forms/' + sampleOrderEnquiryFormResponse._id);
		}));

		it('$scope.update() should update a valid Order enquiry form', inject(function(OrderEnquiryForms) {
			// Define a sample Order enquiry form put data
			var sampleOrderEnquiryFormPutData = new OrderEnquiryForms({
				_id: '525cf20451979dea2c000001',
				name: 'New Order enquiry form'
			});

			// Mock Order enquiry form in scope
			scope.orderEnquiryForm = sampleOrderEnquiryFormPutData;

			// Set PUT response
			$httpBackend.expectPUT(/order-enquiry-forms\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/order-enquiry-forms/' + sampleOrderEnquiryFormPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderEnquiryFormId and remove the Order enquiry form from the scope', inject(function(OrderEnquiryForms) {
			// Create new Order enquiry form object
			var sampleOrderEnquiryForm = new OrderEnquiryForms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Order enquiry forms array and include the Order enquiry form
			scope.orderEnquiryForms = [sampleOrderEnquiryForm];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/order-enquiry-forms\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrderEnquiryForm);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orderEnquiryForms.length).toBe(0);
		}));
	});
}());