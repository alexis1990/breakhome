<<<<<<< HEAD
app.factory('productFactory', function($http) {
=======
app.factory('productFactory', function($http, $localstorage) {
	var serverURL = "http://10.35.1.27:3000";
>>>>>>> origin/master

    return {
        products: [],
        productDisplay: [],

<<<<<<< HEAD
        getSyna: function() {
            var self = this;
            return $http({
                url: "https://api.foursquare.com/v2/venues/search?client_id=PKVXTBZA5YYAFMGC4LBPNOO0H1RZFZCLD2WXMOVBEPIMOLKP&client_secret=VKZYA4VQQIGWSCRHY443FQKVLBJTKHTYAILVYQT2QAEMO0GN&v=20130815&ll=48.8,2.3&query=synagogue",
                method: 'GET'
            }).success(function(data) {
                self.products = data;
            })
        }
    }
})
=======
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

>>>>>>> origin/master
