<?php
namespace App\Http\Controllers;
use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index() {
        $roles = Role::all();
        return response()->json($roles);
    }
    public function create(Request $request) {
        $role = new Role;
        $role->name = $request->name;

        $role->save();
        return response()->json($role);
    }
    public function show($id) {
        $role = Role::find($id);
        return response()->json($role);
    }
    public function update(Request $request, $id) {
        $role = Role::find($id);

        if ($request->input('username')) {
            $role->name = $request->input('name');
        }

        $role->save();
        return response()->json($role);
    }
    public function destroy($id) {
        $role = Role::find($id);
        $role->delete();
        return response()->json('Role removed successfully');
    }
}
