app.factory('productFactory', function($http) {
	var serverURL = "http://10.35.1.27:3000";

	return {
		products: [],
		productDisplay: [],

		getProducts: function() {
			var self = this;
			return $http({
				url: "js/products.json",
				method: 'GET'
			}).success(function(data) {
				self.products = data;
			})
		},

		addProduct: function() {
			// this.getProducts();
		}
	}
})