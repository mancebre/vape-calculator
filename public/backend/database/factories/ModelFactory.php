<?php

use App\User;
use App\Recipe;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
 */

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'username' => $faker->username,
        'password' => Hash::make(123456),
        'email' => $faker->unique()->email,
        'firstname' => $faker->firstname,
        'lastname' => $faker->lastname,
//        'active' => rand(0, 1),
        'active' => 1,
        'newsletter' => rand(0, 1),
        'activation_key' => ''
    ];
});

$factory->define(App\UserRoles::class, function (Faker\Generator $faker) {
    return [
        'user_id' => User::all()->random()->id,
        'role_id' => 3, // User
    ];
});

$factory->define(App\Recipe::class, function (Faker\Generator $faker) {

    $name = "";
    $pg = rand(0, 100);
    $vg = rand(0, 100);
    $desiredStrength = rand(0, 20);

    $name .= $pg . "/" . $vg . ", ";
    $name .= $desiredStrength . " mg";

    return [
        'name' => $name,
        'amount' => rand(10, 1000),
        'desired_strength' => $desiredStrength,
        'pg' => $pg,
        'vg' => $vg,
        'nicotine_strength' => rand(0, 100),
        'nicotine_pg' => rand(0, 100),
        'nicotine_vg' => rand(0, 100),
        'wvpga' => rand(0, 20),
        'sleep_time' => rand(0, 40),
        'vape_ready' => rand(0, 1),
        'comment' => $faker->text,
        'user_id' => User::all()->random()->id,
        'private' => rand(0, 1),
        'deleted' => 0,
    ];
});

$factory->define(App\RecipeFlavors::class, function (Faker\Generator $faker) {
    $types = array('pg', 'vg');
    $rand_keys = array_rand($types, 1);
    return [
        'recipe_id' => Recipe::all()->random()->id,
        'name' => "Flavor" . rand(1, 50),
        'amount' => rand(0, 100),
        'percentage' => rand(0, 20),
        'type' => $types[$rand_keys],
        'grams' => rand(0, 25)
    ];
});

$factory->define(App\Rating::class, function (Faker\Generator $faker) {
    return [
        'recipe_id' => Recipe::all()->random()->id,
        'user_id' => User::all()->random()->id,
        'rating' => rand(1, 5)
    ];
});

$factory->define(App\Issues::class, function (Faker\Generator $faker) {
    return [
        'user_id' => User::all()->random()->id,
        'text' => $faker->text,
        'reportBack' => $faker->unique()->email,
        'resolved' => false,
        'group_id' => 123 // If we want to group issues someday...
    ];
});
