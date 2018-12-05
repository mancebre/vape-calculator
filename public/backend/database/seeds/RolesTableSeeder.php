<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    private $roles = array('Global Admin', 'Admin', 'User');
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->roles as $roleName) {
            $role = new App\Role;
            $role->name = $roleName;
            $role->save();

        }
    }
}
