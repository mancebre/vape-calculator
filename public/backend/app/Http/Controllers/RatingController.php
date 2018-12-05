<?php
namespace App\Http\Controllers;
use App\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index() {
        $ratings = Rating::all();

        return response()->json($ratings);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request) {
        $user = AuthController::getCurrentUser($request);

        $rating = new Rating;
        $rating->user_id = $user->user_id;
        $rating->recipe_id = $request->recipe_id;
        $rating->rating = $request->rating;

        $rating->save();

        return response()->json($rating);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id) {
        $rating = Rating::find($id);

        return response()->json($rating);
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id) {
        $rating = Rating::find($id);

        if ($request->input('rating')) {
            $rating->rating = $request->input('rating');
        }

        $rating->save();
        return response()->json($rating);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id) {
        $rating = Rating::find($id);
        $rating->delete();
        return response()->json('rating removed successfully');
    }
}
