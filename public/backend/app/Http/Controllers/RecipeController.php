<?php
namespace App\Http\Controllers;
use App\Rating;
use App\Recipe;
use App\RecipeFlavors;
use Illuminate\Http\Request;

class RecipeController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
	public function index() {
        $recipes = Recipe::with('recipeFlavors')->where('deleted', 0)->get();

		return response()->json($recipes);
	}

    /**
     * Return all public recipes
     *
     * @return \Illuminate\Http\JsonResponse
     */
	public function getAllRecipes() {
	    $recipes = Recipe::with(['recipeFlavors'])
            ->with('rating')->with('user')
            ->where('private', 0)
            ->where('deleted', 0)
            ->get();

        return response()->json($recipes);
    }

    /**
     * Get all recipes with flavor made by this user.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
	public function userRecipes(Request $request) {
        $user = AuthController::getCurrentUser($request);
        $recipes = Recipe::with(['recipeFlavors'])
            ->with('rating')
            ->where('user_id', $user->user_id)
            ->where('deleted', 0)
            ->get();

        return response()->json($recipes);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
	public function create(Request $request) {
        $user = AuthController::getCurrentUser($request);

        $nicotine = json_decode($request->nicotine);
        $flavors = json_decode($request->flavor);
		$recipe = new Recipe;
		$recipe->name = $request->name;
		$recipe->desired_strength = $request->desired_strength;
		$recipe->pg = $request->pg;
		$recipe->vg = $request->vg;
		$recipe->nicotine_strength = $nicotine->strength;
		$recipe->nicotine_pg = $nicotine->pg;
		$recipe->amount = $request->amount;
		$recipe->nicotine_vg = $nicotine->vg;
		$recipe->wvpga = $request->wvpga;
		$recipe->sleep_time = $request->sleep_time;
		$recipe->vape_ready = $request->vapeReady;
        $recipe->comment = $request->comment;
        $recipe->user_id = $user->user_id;
        $recipe->private = $request->private;

		$recipe->save();

		// Not sure this is right way to do this.
		foreach ($flavors as $flavor) {

            $recipe->recipeFlavors()->saveMany([
                new RecipeFlavors([
                    "recipe_id"=>$recipe->id,
                    "percentage"=>$flavor->percentage,
                    "amount"=>$flavor->amount,
                    "grams"=>$flavor->grams,
                    "type"=>$flavor->type,
                    "name"=>$flavor->name
                ])
            ]);

        }

		return response()->json($recipe);
	}

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function show($id) {
		$recipe = Recipe::with('RecipeFlavors')->with('user')->find($id);
		// Why do I have to do this??
//		$recipe->flavors = RecipeFlavors::owned($id);
		return response()->json($recipe);
	}

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function update(Request $request, $id) {
        $user = AuthController::getCurrentUser($request);
		$recipe = Recipe::find($id);

		if ($user->user_id != $recipe->user_id) {

            return response("You can only edit your own recipes", 403);

        }

		if ($request->input('name')) {
			$recipe->name = $request->input('name');
		}
		if ($request->input('username')) {
			$recipe->username = $request->input('username');
		}
		if ($request->input('desired_strength')) {
			$recipe->desired_strength = $request->input('desired_strength');
		}
		if ($request->input('pg')) {
			$recipe->pg = $request->input('pg');
		}
		if ($request->input('vg')) {
			$recipe->vg = $request->input('vg');
		}
		if ($request->input('nicotine_strength')) {
			$recipe->nicotine_strength = $request->input('nicotine_strength');
		}
		if ($request->input('nicotine_pg')) {
			$recipe->nicotine_pg = $request->input('nicotine_pg');
		}
		if ($request->input('amount')) {
			$recipe->amount = $request->input('amount');
		}
		if ($request->input('nicotine_vg')) {
			$recipe->nicotine_vg = $request->input('nicotine_vg');
		}
		if ($request->input('wvpga')) {
			$recipe->wvpga = $request->input('wvpga');
		}
		if ($request->input('sleep_time')) {
			$recipe->sleep_time = $request->input('sleep_time');
		}
        if ($request->input('comment')) {
            $recipe->comment = $request->input('comment');
        }
//        if ($request->input('vapeReady')) {
            $recipe->vape_ready = $request->input('vapeReady');
//        }
//        if ($request->input('private')) {
            $recipe->private = $request->input('private');
//        }

        $inputFlavors = json_decode($request->input('flavor'));

		// Update flavors if there are flavors
        if(count($inputFlavors) > 0) {
            foreach ($inputFlavors as $flavor) {
                if (isset($flavor->id)) {
                    // Flavors that have id needs to be updated.
                    $recipeFlavor = RecipeFlavors::find($flavor->id);

                    $recipeFlavor->recipe_id = $id;
                    $recipeFlavor->name = $flavor->name;
                    $recipeFlavor->amount = $flavor->amount;
                    $recipeFlavor->percentage = $flavor->percentage;
                    $recipeFlavor->type = $flavor->type;
                    $recipeFlavor->grams = $flavor->grams;

                    $recipeFlavor->save();
                } else  {
                    // Flavors that doesnt have id are new and need to be added.
                    $recipeFlavor = new RecipeFlavors;

                    $recipeFlavor->recipe_id = $id;
                    $recipeFlavor->name = $flavor->name;
                    $recipeFlavor->amount = $flavor->amount;
                    $recipeFlavor->percentage = $flavor->percentage;
                    $recipeFlavor->type = $flavor->type;
                    $recipeFlavor->grams = $flavor->grams;

                    $recipeFlavor->save();
                }
            }

            if (count($inputFlavors) < count($recipe->recipeFlavors)) {
                // Delete removed flavors from database
                $removedFlavors = $this->calculateRemovedFlavors($recipe->recipeFlavors, $inputFlavors);
                RecipeFlavors::destroy($removedFlavors);
            }

        }

        $recipe->save();
		return response()->json($recipe);
	}

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
	public function destroy($id) {
		$recipe = Recipe::find($id);
//		$recipe->delete(); // Data is money!!!
        $recipe->deleted = false;
        $recipe->save();
		return response()->json('recipe removed successfully');
	}

    /**
     * @param $old
     * @param $new
     * @return array
     */
    private function calculateRemovedFlavors($old, $new) {
	    $newIds = array();
	    $oldIds = array();

        foreach ($old as $item) {
            if(isset($item->id)) {
                $oldIds[] = $item->id;
            }
	    }

        foreach ($new as $item) {
            if(isset($item->id)) {
                $newIds[] = $item->id;
            }
	    }

	    return array_diff($oldIds, $newIds);
    }
}
