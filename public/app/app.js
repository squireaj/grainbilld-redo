angular.module('GrainBilld', [ 'ui.router' ])

		.run(function() {
				document.addEventListener('DOMContentLoaded', function() {
					FastClick.attach(document.body);
				}, false);
		})

		.config(function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/Home');

			$stateProvider

					.state('home', {
						url: '/Home',
						controller: 'HomeController as cnt',
						templateUrl: 'app/templates/home.template.html'
					})

					.state('newBeer', {
						url: '/NewBeer',
						controller: 'NewBeerController as cnt',
						templateUrl: 'app/templates/newBeer.template.html',
						resolve: {
							getIngredients: function(RecipeService) {
								return RecipeService.getAllIngredients().then(function(data) {
									return data.data;
								});
							}
						}
					});

		});
