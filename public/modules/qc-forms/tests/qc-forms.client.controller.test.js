'use strict';

(function() {
	// Qc forms Controller Spec
	describe('Qc forms Controller Tests', function() {
		// Initialize global variables
		var QcFormsController,
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

			// Initialize the Qc forms controller.
			QcFormsController = $controller('QcFormsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Qc form object fetched from XHR', inject(function(QcForms) {
			// Create sample Qc form using the Qc forms service
			var sampleQcForm = new QcForms({
				name: 'New Qc form'
			});

			// Create a sample Qc forms array that includes the new Qc form
			var sampleQcForms = [sampleQcForm];

			// Set GET response
			$httpBackend.expectGET('qc-forms').respond(sampleQcForms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.qcForms).toEqualData(sampleQcForms);
		}));

		it('$scope.findOne() should create an array with one Qc form object fetched from XHR using a qcFormId URL parameter', inject(function(QcForms) {
			// Define a sample Qc form object
			var sampleQcForm = new QcForms({
				name: 'New Qc form'
			});

			// Set the URL parameter
			$stateParams.qcFormId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/qc-forms\/([0-9a-fA-F]{24})$/).respond(sampleQcForm);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.qcForm).toEqualData(sampleQcForm);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(QcForms) {
			// Create a sample Qc form object
			var sampleQcFormPostData = new QcForms({
				name: 'New Qc form'
			});

			// Create a sample Qc form response
			var sampleQcFormResponse = new QcForms({
				_id: '525cf20451979dea2c000001',
				name: 'New Qc form'
			});

			// Fixture mock form input values
			scope.name = 'New Qc form';

			// Set POST response
			$httpBackend.expectPOST('qc-forms', sampleQcFormPostData).respond(sampleQcFormResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Qc form was created
			expect($location.path()).toBe('/qc-forms/' + sampleQcFormResponse._id);
		}));

		it('$scope.update() should update a valid Qc form', inject(function(QcForms) {
			// Define a sample Qc form put data
			var sampleQcFormPutData = new QcForms({
				_id: '525cf20451979dea2c000001',
				name: 'New Qc form'
			});

			// Mock Qc form in scope
			scope.qcForm = sampleQcFormPutData;

			// Set PUT response
			$httpBackend.expectPUT(/qc-forms\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/qc-forms/' + sampleQcFormPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid qcFormId and remove the Qc form from the scope', inject(function(QcForms) {
			// Create new Qc form object
			var sampleQcForm = new QcForms({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Qc forms array and include the Qc form
			scope.qcForms = [sampleQcForm];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/qc-forms\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleQcForm);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.qcForms.length).toBe(0);
		}));
	});
}());