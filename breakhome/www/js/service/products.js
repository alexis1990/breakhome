app.factory('productFactory', function($http) {


    return {
        products: [],
        productDisplay: [],


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