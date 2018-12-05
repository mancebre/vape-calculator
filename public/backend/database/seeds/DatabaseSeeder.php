<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
        $this->call('UsersTableSeeder');
        $this->call('RolesTableSeeder');
        $this->call('UserRolesTableSeeder');
        $this->call('RecipesTableSeeder');
        $this->call('RecipeFlavorsSeeder');
        $this->call('RatingsTableSeeder');
        $this->call('IssuesTableSeeder');
	}
}
