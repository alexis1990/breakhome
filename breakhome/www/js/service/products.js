app.factory('productFactory', function($http, $localstorage) {
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

		// getProductDisplay: function(){
		// 	var post = $localstorage.getObject('productToDisplay');
 	// 		if(this.productDisplay == null){
 	// 			return post;
 	// 		} else{
 	// 			return this.productDisplay;
 	// 		}
		// },

		addProduct: function() {
			// this.getProducts();
		}
	}
})

