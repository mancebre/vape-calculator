<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
 */

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

// $router->group(['prefix' => 'api/v1'], function () use ($router) {
// 	$router->get('/users', 'UserController@index');
// 	$router->post('/user', 'UserController@create');
// 	$router->get('/user/{id}', 'UserController@show');
// 	$router->put('/user/{id}', 'UserController@update');
// 	$router->delete('/user/{id}', 'UserController@destroy');

// 	$router->get('/recipes', 'RecipeController@index');
// 	$router->post('/recipe', 'RecipeController@create');
// 	$router->get('/recipe/{id}', 'RecipeController@show');
// 	$router->put('/recipe/{id}', 'RecipeController@update');
// 	$router->delete('/recipe/{id}', 'RecipeController@destroy');
// });

// Logged in users
$router->group(
    [
        'middleware' => ['jwt.auth', 'myAuth'],
        'prefix' => 'api/v1'
    ],
    function () use ($router) {
        /**
         * Users
         */
        $router->get('/users', 'UserController@index');
        $router->get('/user/{id}', 'UserController@show');
        $router->put('/user/{id}', 'UserController@update');
        $router->delete('/user/{id}', 'UserController@destroy');
        $router->put('/email/{id}', 'UserController@updateEmail');
        $router->put('/user/password/{id}', 'UserController@updatePassword');

        /**
         * Recipe
         */
        $router->get('/recipes', 'RecipeController@index');
        $router->post('/recipe', 'RecipeController@create');
        $router->put('/recipe/{id}', 'RecipeController@update');
        $router->delete('/recipe/{id}', 'RecipeController@destroy');

        $router->get('/myRecipes', 'RecipeController@userRecipes');

        /**
         * Rating
         */
        $router->get('/ratings', 'RatingController@index');
        $router->post('/rating', 'RatingController@create');
        $router->get('/rating/{id}', 'RatingController@show');
        $router->put('/rating/{id}', 'RatingController@update');
        $router->delete('/rating/{id}', 'RatingController@destroy');
    }
);

// Accessible without login
$router->group(
    [
//        'middleware' => 'cors',
        'prefix' => 'api/v1'
    ],
    function () use ($router) {
        // Login
        $router->post('auth/login', 'AuthController@authenticate');
        // Register
        $router->post('/user', 'UserController@create');
        $router->post('/usernameCheck', 'UserController@usernameCheck');
        $router->post('/emailCheck', 'UserController@emailCheck');
        $router->get('/activate/{key}', 'UserController@activate');
        $router->post('/resetPassword', 'UserController@resetPassword');

        $router->get('/getAllRecipes', 'RecipeController@getAllRecipes');
        $router->get('/recipe/{id}', 'RecipeController@show');

        // Bug report
        $router->post('/issueReport', 'IssuesController@create');
    }
);

