<?php
namespace App\Http\Controllers;
use App\RecipeFlavors;
use Illuminate\Http\Request;

class RecipeFlavorsController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index() {
        $recipesFlavors = RecipeFlavors::all();
        return response()->json($recipesFlavors);
    }
    public function create(Request $request) {
        $recipeFlavor = new RecipeFlavors;

        $recipeFlavor->recipe_id = $request->recipe_id;
        $recipeFlavor->name = $request->name;
        $recipeFlavor->amount = $request->amount;
        $recipeFlavor->percentage = $request->percentage;
        $recipeFlavor->type = $request->type;
        $recipeFlavor->grams = $request->grams;

        $recipeFlavor->save();
        return response()->json($recipeFlavor);

    }
    public function show($id) {
        $recipeFlavors = RecipeFlavors::find($id);
        return response()->json($recipeFlavors);
    }
    public function destroy($id) {
        $recipeFlavors = RecipeFlavors::find($id);
        $recipeFlavors->delete();
        return response()->json('recipe flavor removed successfully');
    }
}
