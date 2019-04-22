<?php
namespace App\Http\Controllers;

use Log;
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
        $usernameCheck = User::where('username', $request->username)->first();

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
            $activationEmail = $this->sendActivationEmail($user);
            $log = [
                "Email_sent" => $activationEmail,
                "user_data" => $user
            ];
            Log::info("Activation Email", $log);

            return response()->make("Thank you. You have successfully registered new account.");
        }
	}

    /**
     * @param $user
     * @return bool
     */
	private function sendActivationEmail($user)
    {
        $to      = $user->email;
        $subject = 'Please activate your vaper cuisine account';
        $message = "Hi " . $user->firstname . ", \n\n";
        $message .= "Please click on link to activate your account \n\n\t";
        $message .= "http://vaperscuisine.com/activate/" . $user->activation_key . " \n\n";
        $message .= "Best regards, \n";
        $message .= "vaperscuisine.com \n";
        $headers = 'From: noreply@vaperscuisine.com' . "\r\n" .
        'Reply-To: noreply@vaperscuisine.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        return mail($to, $subject, $message, $headers);
    }

    private function sendTemporaryPasswordEmail($user, $password)
    {
        $to      = $user->email;
        $subject = 'Vaper cuisine temporary login credentials';
        $message = "Hi " . $user->firstname . ", \n\n";
        $message .= "This is your temporary password \n\n\t";
        $message .= $password . " \n\n";
        $message .= "Please change your password as soon as you login!" . " \n\n";
        $message .= "Best regards, \n";
        $message .= "vaperscuisine.com \n";
        $headers = 'From: noreply@vaperscuisine.com' . "\r\n" .
            'Reply-To: noreply@vaperscuisine.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        return mail($to, $subject, $message, $headers);
    }

    private function generatePassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
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

        $user->newsletter = $request->input('newsletter');
        $user->lastname = $request->input('lastname');
        $user->firstname = $request->input('firstname');


//		if ($request->input('password')) {
//			$user->password = Hash::make($request->input('password'));
//		}
//		// If email is updated send activation link end set account to active = 0.
//		if ($request->input('email')) {
//			$user->email = $request->input('email');
//		}

		$user->save();
		return response()->json("User updated successfully.");
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

	public function activate($activation_key)
    {
//        sleep(5);
        $user = User::where('activation_key', $activation_key)->first();
        if ($user) {
            $user->active = true;
            $user->activation_key = "";
            $user->save();
            return response()->make("Account activated", 200);
        } else {
            return response()->make("Account activation failed, please try again.", 404);
        }
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function resetPassword(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->make("Email not found", 400);
        } else {
            // Generate and save new password.
            $password = $this->generatePassword();
            $user->password = Hash::make($request->input('password'));
            $user->save();

            // Send new password to user.
            if ($this->sendTemporaryPasswordEmail($user, $password)) {
                return response()->make("Temporary password is sent to you email, please check your email.", 200);
            } else {
                return response()->make("Something went wrong, please try again", 500);
            }
        }
    }

    public function updateEmail(Request $request, $id) {

        // Check is this right user.
        $currentUser = AuthController::getCurrentUser($request);
        if ($currentUser->user_id !== (int)$id) {
            return response()->make("Bad user", 400);
        }
        // Check is mail valid

        // Get user
        $user = User::find($id);
        // Set email
        $user->email = $request->input('email');

        // Set user account active = 0
        // Set activation link
        // Update user
        $user->active = 0;
        $user->activation_key = substr(str_shuffle(MD5(microtime())), 0, 32);

        $user->save();

        // Send activation email
        $activationEmail = $this->sendActivationEmail($user);
        $log = [
            "Email_sent" => $activationEmail,
            "user_data" => $user
        ];
        Log::info("Activation Email after email change", $log);

        return response()->make("Email updated, activation link sent", 200);
    }

    public function updatePassword(Request $request, $id) {

        // Check is this right user.
        $currentUser = AuthController::getCurrentUser($request);
        if ($currentUser->user_id !== (int)$id) {
            return response()->make("Bad user", 400);
        }

        // Get user
        $user = User::find($id);

        // Check old password.
        if (!Hash::check($request->input('oldPass'), $user->password)) {
            return response()->make("Bad password.", 400);
        }

        // Update password.
        $user->password = Hash::make($request->input('newPass'));
        $user->save();

        return response()->make("Password updated.", 200);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function resendActivation(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->make("Email not found", 400);
        } else {

            // Send activation email
            $activationEmail = $this->sendActivationEmail($user);
            $log = [
                "Email_sent" => $activationEmail,
                "user_data" => $user
            ];
            Log::info("Activation Email", $log);

            return response()->make("Activation email sent.");
        }
    }
}
