var app = angular.module('myApp', ['ngRoute']);

app.constant("baseURL", "http://localhost:3000/");

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "src/templates/home.html"
  })
  .when("/aboutUs", {
    templateUrl: "src/templates/about-us.html",
  })
  .when("/cookware", {
    templateUrl: "src/templates/cookware.html",
    controller: "cookwareCtrl"
  })
  .when("/addRecipe", {
    templateUrl: "src/templates/add-recipe.html",
    controller: "addRecipeCtrl"
  })
  .when("/recipeList/:category?", {
    templateUrl: "src/templates/Recipe-list.html",
    controller: "recipeCtrl"
  })
  .when("/delete/:id", {
    templateUrl: "src/templates/Recipe-list.html",
    controller: "deleteRecipe"
  })
  .when("/edit/:id", {
    templateUrl: "src/templates/add-recipe.html",
    controller: "editRecipe"
  })
  .when("/moreInfo/:id", {
    templateUrl: "src/templates/recipe-info.html",
    controller: "recipeInfo"
  })
  .otherwise({
    redirectTo: "/"
  });
});

app.service('recipes', function($http, baseURL) {
    this.getRecipes = function() {
      return $http.get(baseURL + "recipes");
    }
});

app.service('oneRecipe', function($http, baseURL) {
    this.getOneRecipe = function(id) {
      return $http.get(baseURL + "recipes/" + id);
    }
});

app.controller('myCtrl', function($scope, $location) {
  $('.search').submit(function(e) {
    e.preventDefault();
  });

  $scope.location = $location;
});

app.controller('addRecipeCtrl', function($scope, $location, recipes, $window, $http, baseURL) {
 $scope.recipe = {
      name: '',
      difficulty: '',
      ingredients: '',
      directions: '',
      cookingTime: '',
      category: '',
      img: './images/noImage.gif'
    };

    $scope.addRecipe = function(recipe) {
      $http.post(baseURL + "recipes", recipe);
      $window.location.href = '#recipeList';
    };
});

app.controller('recipeCtrl', function($scope, $routeParams, $location, recipes) {
    $scope.category = ($routeParams.category);
    $scope.test = $scope.category;
    $scope.search = $scope.recipeSearch;
    $scope.showRecipes = false;
    $scope.message = "Loading..."
    $scope.recipes = [];
    recipes.getRecipes()
    .then(
      function(response) {
        $scope.recipes = response.data;
        $scope.showRecipes = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
});

app.controller('cookwareCtrl', function($scope) {
  $scope.pic = 1;
});

app.controller('deleteRecipe', function($scope, $routeParams, $window, $http, baseURL) {
  $scope.recipeID = ($routeParams.id);
  $http.delete(baseURL + "recipes/" + $scope.recipeID);
  $window.location.href = '#recipeList';
});

app.controller('editRecipe', function($scope, oneRecipe, $routeParams, $window, $http, baseURL) {

  $scope.recipeID = ($routeParams.id);

  $scope.recipe = {};
  oneRecipe.getOneRecipe($scope.recipeID)
  .then(
    function(response) {
      $scope.recipe = response.data;
    }
  );

  $scope.addRecipe = function(recipe) {
    $http.put(baseURL + "recipes/" + $scope.recipeID, recipe);
    $window.location.href = '#recipeList';
  };
});

app.controller('recipeInfo', function($scope, oneRecipe, $routeParams) {
  $scope.recipeID = ($routeParams.id);

  $scope.recipe = {};
  oneRecipe.getOneRecipe($scope.recipeID)
  .then(
    function(response) {
      $scope.recipe = response.data;
    }
  );
});




