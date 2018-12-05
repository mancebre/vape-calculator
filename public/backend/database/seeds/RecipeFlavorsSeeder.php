<?php

use Illuminate\Database\Seeder;

class RecipeFlavorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $recipesFlavors = factory(App\RecipeFlavors::class, 100)->create();
    }
}
