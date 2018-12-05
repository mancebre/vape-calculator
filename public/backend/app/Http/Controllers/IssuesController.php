<?php
namespace App\Http\Controllers;
use App\Issues;
use Illuminate\Http\Request;

class IssuesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {
        $issues = Issues::all();
        return response()->json($issues);
    }
    public function create(Request $request)
    {
        $user = AuthController::getCurrentUser($request);

        $issue = new Issues;
        $issue->text= $request->text;
        $issue->reportBack = $request->reportBack;
        $issue->user_id= isset($user->user_id) ? $user->user_id : null; //User who created bug report
        $issue->resolved = false;

        $issue->save();
//        return response()->json($issue);
        return "Bug successfully reported. Thank you.";
    }
    public function show($id)
    {
        $issue = Issues::find($id);
        return response()->json($issue);
    }
    public function update(Request $request, $id)
    {
        $issue= Issues::find($id);

        $issue->text = $request->input('text') ? $request->input('text') :$issue->text ;
        $issue->reportBack = $request->input('reportBack') ? $request->input('reportBack') :$issue->reportBack ;
        $issue->user_id = $request->input('user_id') ? $request->input('user_id') :$issue->user_id ;
        $issue->resolved = $request->input('resolved') ? $request->input('resolved') :$issue->resolved ;
        $issue->group_id = $request->input('group_id') ? $request->input('group_id') :$issue->group_id ;

        $issue->save();
        return response()->json($issue);
    }
    public function destroy($id)
    {
        $issue = Issues::find($id);
        $issue->delete();
        return response()->json('product removed successfully');
    }
}
