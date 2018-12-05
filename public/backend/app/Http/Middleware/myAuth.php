<?php

namespace App\Http\Middleware;

use Closure;

class MyAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

//        $user = AuthController::getCurrentUser($request);
//
//        return response()->json([$user, $request, $next]);
//
//        return response('Unauthorized.', 401);
        return $next($request);
    }
}
