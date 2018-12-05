<?php

use Illuminate\Database\Seeder;

class RecipesTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
    {
		$recipes = factory(App\Recipe::class, 100)->create();
	}
}
