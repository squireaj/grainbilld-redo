(function() {
	'use strict';

	angular.module('GrainBilld', [ 'ui.router', 'infinite-scroll', 'ngSanitize' ])

			.run(function() {
				document.addEventListener('DOMContentLoaded', function() {
					FastClick.attach(document.body);
				}, false);
			})

			.config(function($stateProvider, $urlRouterProvider) {

				$urlRouterProvider.otherwise('/NewBeer');

				$stateProvider

						.state('home', {
							url: '/Home'
							, controller: 'HomeController as cnt'
							, templateUrl: 'app/templates/home.template.html'
							, resolve: {
								latestRecipes: function(RecipeService) {
									return RecipeService.getLatestCommunity()
											.then(function(data) {
												return data.data;
											})
								}
							}
						})

						.state('newBeer', {
							url: '/NewBeer'
							, controller: 'NewBeerController as cnt'
							, templateUrl: 'app/templates/newBeer.template.html'
							, resolve: {
								getIngredients: function(RecipeService) {
									return RecipeService.getAllIngredients().then(function(data) {
										return data.data;
									});
								}
							}
						});

			});

}());

