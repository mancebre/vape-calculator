<?php
namespace App\Http\Controllers;
use App\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\UserRoles;

class AuthController extends BaseController {
	/**
	 * The request instance.
	 *
	 * @var \Illuminate\Http\Request
	 */
	private $request;
	/**
	 * Create a new controller instance.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return void
	 */
	public function __construct(Request $request) {
		$this->request = $request;
	}
	/**
	 * Create a new token.
	 *
	 * @param  \App\User   $user
	 * @return string
	 */
	protected function jwt(User $user, GoogleToken $googleToken = null) {

        $User = new UserRolesController;

		$payload = [
			'iss' => "vaperscuisine", // Issuer of the token
			'sub' => $user->email, // Subject of the token
			'user_id' => $user->id,
			'firstname' => $user->firstname,
			'lastname' => $user->lastname,
			'username' => $user->username,
			'email' => $user->email,
			'newsletter' => $user->newsletter === 1 ? true : false,
			'roles' => $User->getUserRoles($user->id),
			'iat' => time(), // Time when JWT was issued.
			'exp' => time() + 60 * 60 * 24, // Expiration time
			'google_token' => $googleToken
		];

		// As you can see we are passing `JWT_SECRET` as the second parameter that will
		// be used to decode the token in the future.
		return JWT::encode($payload, env('JWT_SECRET'));
	}

    /**
     * Authenticate a user and return the token if the provided credentials are correct.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
	public function authenticate(User $user) {
		$this->validate($this->request, [
			'email' => 'required|email',
			'password' => 'required',
		]);
		// Find the user by email
		$user = User::where('email', $this->request->input('email'))->first();
		if (!$user) {
			// You wil probably have some sort of helpers or whatever
			// to make sure that you have the same response format for
			// different kind of responses. But let's return the
			// below respose for now.
			return response()->make("Email does not exist.", 400);
		}
		// Verify the password and generate the token
        if (Hash::check( $this->request->input('password'), $user->password)) {
            if (!$user->active) {
                return response()->make("Please activate your account.", 400);
            }
			return response()->json([
				'token' => $this->jwt($user),
			], 200);
		}
		// Bad Request response
        return response()->make("Email or password is wrong.", 400);
	}

    /**
     * @param $request
     * @return object
     */
	public static function getCurrentUser($request) {
        $token = $request->header('Authorization');
        // Prepare token
        $token = str_replace('Token ', '', $token);
        $token = str_replace('"', '', $token);

        return $token ? JWT::decode($token, env('JWT_SECRET'), ['HS256']) : null;
	}
	
	/************* Google Sign-in******************/

	public function googleAuth() {
		// Get $id_token via HTTPS POST.

		$client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
		$payload = $client->verifyIdToken($id_token);
		if ($payload) {
			$userid = $payload['sub'];
			// If request specified a G Suite domain:
			//$domain = $payload['hd'];

			// TODO 
			// If user don't exist in database create it, I'l need user controller here
			// Generate JWT from database user object
			// Return JWT.
		} else {
			// Invalid ID token
        return response()->make("Invalid ID token.", 400);
		}
	}
}