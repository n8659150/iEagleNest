var myApp = angular.module('BreadTopExpress',
  ['ngRoute', 'firebase','ui.bootstrap','angularUtils.directives.dirPagination'])
  .constant('FIREBASE_URL', 'https://breadtopexpress.firebaseIO.com/'); //firebase database url


myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.logout();
        } //current Auth
      } //resolve
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'breadTopExpressController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
