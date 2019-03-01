<?php
namespace App\Http\Controllers;
use App\Recipe;
use App\User;
use App\UserRoles;
use App\Mail\ActivationEmail;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller {
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function index() {
		$users = User::all();
		return response()->json($users);
	}

    /**
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function usernameCheck(Request $request) {
        $usernameCheck = User::where('username', $request->username)->first();
        if ($usernameCheck) {
            return response()->make("Username you entered is already in use.", 400);
        } else {
            return response()->make("");
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function emailCheck(Request $request) {
        $emailCheck = User::where('email', $request->email)->first();
        if ($emailCheck) {
            return response()->make("Email you entered is already in use.", 400);
        } else {
            return response()->make("");
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
	public function create(Request $request) {
        // Check if this email is already in use.
        $emailCheck = User::where('email', $request->email)->first();
        $usernameCheck = User::where('email', $request->username)->first();

        if ($emailCheck) {
            return response()->make("Email you entered is already in use.", 400);
        } elseif ($usernameCheck) {
            return response()->make("Username you entered is already in use.", 400);
        } else {
            $user = new User;
            $user->username = $request->username;
            $user->password = Hash::make($request->password);
            $user->email = $request->email;
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->active = 0;
            $user->newsletter = $request->newsletter;
            $user->activation_key = substr(str_shuffle(MD5(microtime())), 0, 32);

            $user->save();

            $user->userRoles()->saveMany([
                new UserRoles([
                    "user_id"=>$user->id,
                    "role_id"=>3, // Regular user.
                ])
            ]);

            // Send activation email
            Mail::to($request->email)->send(new ActivationEmail($user));

            return response()->make("Thank you. You have successfully registered new account.");
        }
	}

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function show($id) {
		$user = User::find($id);
		return response()->json($user);
	}

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function update(Request $request, $id) {
		$user = User::find($id);

		if ($request->input('username')) {
			$user->username = $request->input('username');
		}
		if ($request->input('password')) {
			$user->username = Hash::make($request->input('password'));
		}
		if ($request->input('email')) {
			$user->username = $request->input('email');
		}
		if ($request->input('firstname')) {
			$user->username = $request->input('firstname');
		}
		if ($request->input('lastname')) {
			$user->username = $request->input('lastname');
		}
		if ($request->input('active')) {
			$user->username = $request->input('active');
		}
		if ($request->input('newsletter')) {
			$user->username = $request->input('newsletter');
		}

		$user->save();
		return response()->json($user);
	}

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function destroy($id) {
		$user = User::find($id);
		$user->delete();
		return response()->json('user removed successfully');
	}
}
