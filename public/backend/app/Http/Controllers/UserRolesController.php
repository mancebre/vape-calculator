<?php
namespace App\Http\Controllers;
use App\UserRoles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserRolesController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {
        $userRoles = UserRoles::all();
        return response()->json($userRoles);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request) {
        $userRole = new UserRoles;
        $userRole->user_id = $request->user_id;
        $userRole->role_id = $request->role_id;

        $userRole->save();
        return response()->json($userRole);
    }

    /**
     * @param $userId
     * @return array
     */
    public function getUserRoles($userId) {
        $roleIds = array();
        $roleIdsRaw = UserRoles::where('user_id', $userId)->get();
        foreach ($roleIdsRaw as $id) {
            $roleIds[$id['role_id']] = $id['role_id'];
        }

        return array_values($roleIds);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id) {
        $userRole = UserRoles::find($id);
        return response()->json($userRole);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id) {
        $userRole = UserRoles::find($id);

        if ($request->input('user_id')) {
            $userRole->user_id = $request->input('user_id');
        }
        if ($request->input('role_id')) {
            $userRole->role_id = $request->input('role_id');
        }

        $userRole->save();
        return response()->json($userRole);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id) {
        $userRole = UserRoles::find($id);
        $userRole->delete();
        return response()->json('User role removed successfully');
    }
}
